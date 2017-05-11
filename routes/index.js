var express = require('express');
var router = express.Router();

/* GET: Homepage */
router.get('/', function(req, res, next) {
    res.render('index');
});

console.log('index loaded');

module.exports = router;