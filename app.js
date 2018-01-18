const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const yargs = require('yargs');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      address: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage)
    console.log(errorMessage);
  else {
    console.log(`Address: ${results.address}`);
    weather.getWeather(results.latitude, results.longitude, (err, res) => {
      if (errorMessage)
        console.log(err);
      else
        console.log(`It is ${res.temperature}, but it feels like ${res.apparentTemperature}.`);
    })
  }
});
