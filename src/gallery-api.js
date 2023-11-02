import axios from "axios";

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '40402043-48858dfeba64f6420a84d1ef9';
  q = null;
  page = 1;
  async fetchPhotos() {
    const searchParams = new URLSearchParams({
      key: this.#API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      q: this.q,
      page: this.page,
    });
    return await axios.get(`${this.#BASE_URL}?${searchParams}`);
  }
}




// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = "40402043-48858dfeba64f6420a84d1ef9";
// export const params = new URLSearchParams({
//       key: API_KEY,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       per_page: 40,
//       page: 1,
//       q:null,
//     });
// export async function fetchPhotos() {
//   try {
//     return await axios.get(`${BASE_URL}?${params}`)

//   }
//   catch (error) {
//       throw new Error(error.message);
//     };
  
// }
// serviceSearchImage()
//   .then(response => {
//       return console.log(response.data);
//     })