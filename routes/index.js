var express = require('express');
var router = express.Router();


var fs           = require('fs');
var xml2js       = require('xml2js');
var parser       = new xml2js.Parser();


let url    = 'http://api.openweathermap.org/data/2.5/weather?q='
let appId  = 'appid=07cfed3be2655cdb0cd065f883db16db';
let s    = '&cnt=5'
let units  = '&units=metric'; 

var axios = require('axios');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 'body': '',forcast: ''});
});

router.post('/weather', function(req, res, next){
  let city = req.body.city;
  u = url+city+"&"+appId;
  console.log(u)

 axios.get(u)
    .then(function (response) {
      console.log('statusCode:', response && response.status);
      let body = response.data;
      console.log(body);

      if (response.status !== 200) {
        // create an error so it will be handled by express error handlers
        let err = new Error('Unexpected response status: ' + response.status);
        err.status = response.status;
        throw err;
      }

      let count = (body.sys && body.sys.country) ? body.sys.country : '';
      let forecast = "For city " + city + ', country ' + count;
      res.render('index', { body: body, forecast: forecast });
    })
    .catch(function (error) {
      console.log('error:', error && error.message ? error.message : error);
      // forward to express error handlers
      next(error);
    });


});

module.exports = router;