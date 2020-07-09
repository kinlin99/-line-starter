const express = require('express');
const app = express();
var request = require('request');
const port = process.env.PORT || 5000;
const myLiffId = process.env.MY_LIFF_ID;
var userId='';
var displayName='';
var serial='';

app.use(express.static('public'));

app.get('/send-id', function(req, res) {
    res.json({id: myLiffId});
    console.log(req.path);
});

app.get('/device', function(req, res) {
    console.log('/device')
    console.log("Serial : "+req.query.serial);
    serial = req.query.serial;
    res.redirect('/');
});

app.get('/profile', function(req, res) {
    console.log('/profile')
    console.log("userId : "+req.query.userId);
    console.log("displayName : "+req.query.displayName);
    userId = req.query.userId;
    displayName = req.query.displayName;
    res.end();
    if (serial.length() > 0) {
    var reqUrl = "https://line-starter-v2.herokuapp.com/devicecb?"+"serial="+serial+"&"+"userId="+userId;
    request.get(reqUrl, function (err, resp, body) {
        if (err) {
            console.log('Error!');
        } else {
            console.log('OK!');
        }
    });
    }
    serial = '';
    userId = '';
    displayName = '';
});

app.get('/devicecb', function(req, res) {
    console.log('/devicecb')
    console.log('serial : '+req.query.serial);
    console.log('userId : '+req.query.userId);
    res.end();
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
