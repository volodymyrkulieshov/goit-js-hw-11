import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import{BASE_URL,params} from './gallery-api'
// axios.defaults.headers.common['x-api-key'] =
//   'live_mw1wBFgWwKML3FhpuSEsISiVgwRZVBIhpdCjmemzslSsGbt2r1BAtVkT7YtRxOLe';

const elements = {
    form: document.querySelector('#search-form'),
    container: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}

const { form, container, loadMoreBtn } = elements;
