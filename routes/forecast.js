var express = require('express');
var router = express.Router();
const DarkSky = require('dark-sky');
const forecast = new DarkSky('11eff69350b9b6a78ea4e05fe20cf341');
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAyoZqNfssajl2f4TAk8Tfpfi-tyFm1w5U'
});

/* GET: Weather */
router.get('/', (req, responseComplete) => {
    googleMapsClient.geocode({
      address: req.query.address
    }, (err, response) => {
      if (!err) {

        forecast
        .latitude(response.json.results[0].geometry.location.lat)
        .longitude(response.json.results[0].geometry.location.lng)
        .get()
        .then(res => {
  
            var weekArray = res.daily.data
            //not sure about 7 days wording
            //weekArray.shift()
            let address = response.json.results[0].formatted_address.split(",")
            let cityName = address[0]
            let stateName = address[1].split(" ")[1]

            let obj = {weather:weekArray, 
                city: cityName+", "+stateName}
            responseComplete.json(obj)
        })
        .catch(err => {    

            console.log(err)
        })
      }
    })
});

router.get('/hourly', (req, responseComplete) => {
    googleMapsClient.geocode({
      address: req.query.address
    }, (err, response) => {
      if (!err) {
          
        forecast
        .latitude(response.json.results[0].geometry.location.lat)
        .longitude(response.json.results[0].geometry.location.lng)
        .time(req.params.time)
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