import axios from 'axios';

/**
 * Define the base axios URL. 
 */
axios.defaults.baseURL = "http://localhost:3001/api";

/**
 * Contains the data of the response body 
 * @param {any} response 
 */
const resBody = (response) => response.data;

/**
 * Defines HTTP functions for CRUD functionality. 
 */
const requests = {
  get: (url) => axios.get(url).then(resBody),
  post: (url, body) => axios.post(url, body).then(resBody),
  put: (url, body) => axios.put(url, body).then(resBody),
  del: (url) => axios.delete(url).then(resBody) 
}

/**
 * Gets the weather data. 
 */
const weatherForecast = {
  getWeatherData: () => requests.get('/weather'), 
}

export default {
  weatherForecast
}