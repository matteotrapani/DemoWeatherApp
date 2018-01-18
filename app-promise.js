const yargs = require('yargs');
const axios = require('axios');
const geoip = require('geoip-lite');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      address: 'Address to fetch weather for',
      string: true,
      default: 'Milan Duomo'
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

var printNextWeekForecast= (forecast) => {
  console.log();
  console.log('Here you are a summary for the next week:');
  console.log(`${forecast.summary}`);
  forecast.data.forEach((data) => {
    console.log(new Date(data.time * 1000).toDateString());
    console.log(`High: ${data.temperatureHigh}° - Low: ${data.temperatureLow}°`);
    console.log(`Precipitation probability: ${(data.precipProbability*100).toFixed(2)}%`);
  })
};

axios.get(geocodeUrl)
  .then((response) => {
    if (response.data.status === 'ZERO_RESULTS')
      throw new Error('Unable to find that address');

    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    console.log(response.data.results[0].formatted_address);

    var weatherUrl = `https://api.darksky.net/forecast/e54767e5f67484789a7c3d45e3a0844f/${latitude},${longitude}?units=auto`;
    return axios.get(weatherUrl);
  })
  .then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    var precipProbability = response.data.currently.precipProbability;
    console.log(`It is ${temperature}, but it feels like ${apparentTemperature}.`);
    printNextWeekForecast(response.data.daily);
  })
  .catch((error) => {
    if (error.code === 'ENOTFOUND')
      console.log('Unable to connect to API servers');
    else
      console.log(error.message);
  });
