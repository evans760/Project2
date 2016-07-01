// now we are in localhost:3000/beaches
var express = require('express');
var router = express.Router();
var request = require('request');

// $.ajax({
//   method: 'GET',
//   url: 'http://api.surfline.com/v1/forecasts/4245?resources=surf,analysis,wind&json=true'
// }).done(function(data) {
//   // render chart
// });


// var app = express();

router.get('/', function(req, res) {

    // var qs = {
    //   s: 'resources=surf,analysis'
    // }

    request({
        url: 'http://api.surfline.com/v1/forecasts/4245?resources=surf,analysis,wind&json=true'
        // json: true,
        // qs: qs
    }, function(error, response, body) {
        console.log(error);
        if (!error && response.statusCode == 200) {
            var dataObj = JSON.parse(body);
            console.log(dataObj);
            console.log('hit');
            // res.send(dataObj.Search);
            // console.log(error, response);
            // console.log(body);
            // res.send(body)
            // body.Surf
            // var beachReport = dataObj.Tide.dataPoints;
            var beachData = [];
            for (var i = 0; i < 7; i++) {
                for (var j = 0; j < dataObj.Surf.dateStamp[i].length; j++) {
                    var dat = {};
                    dat.date = dataObj.Surf.dateStamp[i][j];
                    dat.sd1 = dataObj.Surf.swell_direction1[i][j];
                    dat.sd2 = dataObj.Surf.swell_direction2[i][j];
                    dat.sd3 = dataObj.Surf.swell_direction3[i][j];
                    dat.sp1 = dataObj.Surf.swell_period1[i][j];
                    dat.sp2 = dataObj.Surf.swell_period2[i][j];
                    dat.sp3 = dataObj.Surf.swell_period3[i][j];
                    dat.sh1 = dataObj.Surf.swell_height1[i][j];
                    dat.sh2 = dataObj.Surf.swell_height2[i][j];
                    dat.sh3 = dataObj.Surf.swell_height3[i][j];
                    dat.wd = dataObj.Wind.wind_direction[i][j * 2];
                    dat.ws = dataObj.Wind.wind_speed[i][j * 2];
                    beachData.push(dat);
                }

            }
            res.render('beaches/data', {
                beachData: beachData
            });
            // res.send(beachData);
        }
    });
});






// app.get('/', function(req, res) {
//   var qs = {
//     s: 'star wars'
//   };

//   request({
//     url: 'http://www.omdbapi.com',
//     qs: qs
//   }, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       var dataObj = JSON.parse(body);
//       res.send(dataObj.Search);
//     }
//   });
// });

// app.listen(3000);

router.get('/report', function(req, res) {
    res.render('beaches/beach');



});


module.exports = router;
