var express = require('express');
var router = express.Router();
const DarkSky = require('dark-sky');
const forecast = new DarkSky('11eff69350b9b6a78ea4e05fe20cf341');
var ForecastIo = require('forecastio');

var forecastIo = new ForecastIo('11eff69350b9b6a78ea4e05fe20cf341');


var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAyoZqNfssajl2f4TAk8Tfpfi-tyFm1w5U'
});

/* GET: Weather */
router.get('/', (req, responseComplete) => {

    googleMapsClient.geocode({
      address: req.query.address
    }, (err, response) => {
      if (!err) {

        forecastIo.forecast(response.json.results[0].geometry.location.lat, response.json.results[0].geometry.location.lng).then(function(data) {
          
          let summary = data.daily.summary
            var weekArray = data.daily.data
            console.log(weekArray.length)
            //not sure about 7 days wording
            //weekArray.shift()
            let address = response.json.results[0].formatted_address.split(",")
            let cityName = address[0]
            let stateName = address[1].split(" ")[1]

            let obj = {weather:weekArray, 
                city: cityName+", "+stateName,
                summary: summary}
            responseComplete.json(obj)
        });
      }
    })
});

router.get('/hourly', (req, responseComplete) => {
  let address = req.query.params.split('|')[0];
  let time = parseInt(req.query.params.split('|')[1]);
    googleMapsClient.geocode({
      address: address
    }, (err, response) => {
      if (!err) {
        let newDate = new Date(time * 1000)

        forecast
        .latitude(response.json.results[0].geometry.location.lat)
        .longitude(response.json.results[0].geometry.location.lng)
        .time(newDate)
        .exclude('currently','minutely','daily','alerts','flags')
        .get()
        .then(res => {
            responseComplete.json(res.hourly.data)
        })
        .catch(err => {                 
            console.log(err)
        })
        
      }
    })
});

console.log('weather loaded');

module.exports = router;