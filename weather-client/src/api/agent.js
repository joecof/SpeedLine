import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001/api";
const resBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(resBody),
  post: (url, body) => axios.post(url, body).then(resBody),
  put: (url, body) => axios.put(url, body).then(resBody),
  del: (url) => axios.delete(url).then(resBody) 
}

const weatherForecast = {
  getWeatherData: () => requests.get('/weather'), 
}

export default {
  weatherForecast
}