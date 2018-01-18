const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
      var encodedAddress = encodeURIComponent(address);

      request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
      }, function (error, response, body) {
        if (error){
          reject('Unable to connect to google servers');
          return;
        }
        if (body.status === 'ZERO_RESULTS'){
          reject('Unable to find that address');
          return;
        }
        if (body.status === 'OK') {
          var address = body.results[0];
          resolve({
            address: address.formatted_address,
            latitude: address.geometry.location.lat,
            longitude: address.geometry.location.lng
          });
          return;
        }
      });
  })
};

geocodeAddress('00000000000').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
})
