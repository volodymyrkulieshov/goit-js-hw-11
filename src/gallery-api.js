export const BASE_URL = 'https://pixabay.com/api/';
export const API_KEY = "40402043-48858dfeba64f6420a84d1ef9";
export const params = new URLSearchParams({
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: 1,
      q:''
    });
