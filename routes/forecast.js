var express = require('express');
var router = express.Router();
const DarkSky = require('dark-sky');
const forecast = new DarkSky('11eff69350b9b6a78ea4e05fe20cf341');

/* GET: Weather */
router.get('/', function(req, response) {
    forecast
    .latitude('36.923015')
    .longitude('-76.244641')
    .get()
    .then(res => {
        console.log(res)
        response.json(res.daily.data)
    })
    .catch(err => {                 
        console.log(err)
    })

});

/* GET: Hourly Weather */
router.get('/hourly', function(req, response) {
    forecast
    .latitude('36.923015')
    .longitude('-76.244641')
    .time(req.params.time)
    .get()
    .then(res => {
        response.json(res.hourly.data)
    })
    .catch(err => {                 
        console.log(err)
    })

});

console.log('weather loaded');

module.exports = router;