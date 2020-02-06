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

function genRand(min, max, decimalPlaces) {  
  var rand = Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);  
  var power = Math.pow(10, decimalPlaces);
  return Math.floor(rand*power) / power;
}

function generateCoordinates(lat1 , lat2, lng1, lng2) {

  const lat = genRand(lat2, lat1, 5)
  const lng = genRand(lng2, lng1, 5)
 
}