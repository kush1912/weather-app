var express = require('express');
var router = express.Router();


var fs           = require('fs');
var xml2js       = require('xml2js');
var parser       = new xml2js.Parser();


let url    = 'http://api.openweathermap.org/data/2.5/weather?q='
let appId  = 'appid=07cfed3be2655cdb0cd065f883db16db';
let s    = '&cnt=5'
let units  = '&units=metric'; 

var request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 'body': '',forcast: ''});
});

router.post('/weather', function(req, res, next){
  let city = req.body.city;
  u = url+city+"&"+appId;
  console.log(u)

 request(u, function (error, response, body) {
      console.log('error:', error); 
      console.log('statusCode:', response && response.statusCode);
      body = JSON.parse(body);
      console.log(body);
      if(error && response.statusCode != 200){
        throw error;
      }

    let count = (body.sys.country) ? body.sys.country : '' ;
    let forecast = "For city "+city+', country '+count;
    res.render('index', {body : body, forecast: forecast});
   });


});

module.exports = router;