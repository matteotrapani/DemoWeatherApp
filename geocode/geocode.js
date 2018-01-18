const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
    }, function (error, response, body) {
    if (error){
      callback('Unable to connect to google servers');
      return;
    }
    if (body.status === 'ZERO_RESULTS'){
      callback('Unable to find that address');
      return;
    }
    if (body.status === 'OK') {
      var address = body.results[0];
      callback('', {
        address: address.formatted_address,
        latitude: address.geometry.location.lat,
        longitude: address.geometry.location.lng
      });
    }
  });
}

module.exports = {
  geocodeAddress
}
