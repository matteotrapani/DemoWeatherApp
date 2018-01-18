//TOKEN: e54767e5f67484789a7c3d45e3a0844f
const request = require('request');

var getWeather = (latitude, longitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/e54767e5f67484789a7c3d45e3a0844f/${latitude},${longitude}?units=auto`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200){
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather');
    }
  })
}

module.exports = {
  getWeather
}
