import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "40402043-48858dfeba64f6420a84d1ef9";
const params = new URLSearchParams({
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: 1,
      q:''
    });
export async function serviceSearchImage() {
  try {
    return await axios.get(`${BASE_URL}?${params}`)

  }
  catch (error) {
      throw new Error(error.message);
    };
  
}
serviceSearchImage()
  .then(response => {
      return console.log(response.data);
    })