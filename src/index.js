import { PixabayAPI } from './gallery-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createMarkup } from './markup';


const elements = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('#search-form'),
  // loadMoreBtn: document.querySelector('.load-more'),
  guard:document.querySelector('.js-guard'),
}

const { gallery, form, loadMoreBtn, guard } = elements;

const pixabayAPI = new PixabayAPI();

const lightbox = new SimpleLightbox('.lightbox', {
  captionsData: 'alt',
  captionDelay: 250,
  enableKeyboard: true,
  showCounter: false,
  scrollZoom: false,
  close: false,});

const options = {
  root: null,
  rootMargin: '400px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(handleIntersect, options);
form.addEventListener('submit', handlerSearchForm);

function handlerSearchForm(evt) {
  evt.preventDefault();
  guard.hidden = true;
  gallery.innerHTML = '';
  const searchQuery = evt.currentTarget.elements['searchQuery'].value.trim();
  pixabayAPI.q = searchQuery;
  pixabayAPI.page = 1;
  searchPhotos();
}

async function searchPhotos() {
  try {
    const { data } = await pixabayAPI.fetchPhotos();
    if (data.hits.length < 1) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    guard.hidden = false;
    observer.observe(guard);
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
}

function handleIntersect(evt) {
  pixabayAPI.page += 1;
  if (evt[0].isIntersecting) {
    searchMorePhotos();
  }
}

async function searchMorePhotos() {
  try {
    const result = pixabayAPI.page * 40;
    const { data } = await pixabayAPI.fetchPhotos();
    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    if (result >= data.totalHits) {
      observer.unobserve(guard);
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
    lightbox.refresh();
  } catch (error) {}
}
