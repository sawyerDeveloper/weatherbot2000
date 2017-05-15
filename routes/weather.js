var express = require('express');
var router = express.Router();
var https = require('https');
/* GET: Weather */
router.get('/', function(req, response, success) {
    var options = {
        host: 'api.darksky.net',
        port: 443,
        path: '/forecast/11eff69350b9b6a78ea4e05fe20cf341/36.8508,76.2859',
        method: 'GET'
    };
    
    var req = https.request(options, function(res) {
        res.on('data', function(data) {
            response.end(data, JSON);
        });
    });
    req.end();

    req.on('error', function(e) {
        console.error(e);
    });

});

console.log('weather loaded');

module.exports = router;