const ecweather = require('ec-weather');
const data = require('../data');

/**
 * Gets weather data using the ec-weather API to obtain weather data 
 * from Environment Canada
 */
exports.getWeather = async (req, res, next) => {
  try {
    
    const promises = [];
    const responses = [];
    for(let i = 0; i < data.cities.length; i++) {
      promises.push(ecweather(data.cities[i]))
    }

    results = await Promise.all(promises);

    if(!results) {
      throw new Error('No weather data found.');
    }

    for(let i = 0; i < results.length; i++) {
      const resultData = {
        city: results[i].title.split(' - ')[0],
        currentConditions: results[i].entries[1].title.split(': ')[1], 
        coordinates: data.cities[i].coordinates,
      }
      
      responses.push(resultData);
    }

    res
    .status(200)
    .json({
      weatherData: responses
    })
  } catch (e) {
    console.error(e)
    res
    .status(400)
    .json({
      weatherData: []
    })
  }
  
}