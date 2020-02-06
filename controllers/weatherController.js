const ecweather = require('ec-weather');
const data = require('../data');

exports.getWeather = (req, res, next) => {

  const promises = [];
  for(let i = 0; i < data.cities.length; i++) {
    promises.push(
      ecweather(data.cities[i]) 
        .then(result => {
          const resultData = {
            city: result.title.split(' - ')[0],
            currentConditions: result.entries[1].title.split(': ')[1], 
            coordinates: data.cities[i].coordinates,
            boxingBoundary: data.cities[i].boundingBox
          }
          return resultData;
        })
        .catch(err => {
          console.log(err);
        })
    )
  }

  Promise.all(promises).then(result => {    
    res
      .status(200)
      .json({
        weatherData: result
      })
  })
}