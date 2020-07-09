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
    //console.log(funcEP+'/device')
    console.log("Serial : "+req.query.serial);
    serial = req.query.serial;
    res.end();
});

app.get('/profile', function(req, res) {
    console.log(funcEP+'/profile')
    console.log("userId : "+req.query.userId);
    console.log("displayName : "+req.query.displayName);
    userId = req.query.userId;
    displayName = req.query.displayName;
    res.end();
    var reqUrl = "https://line-starter-v2.herokuapp.com/devicecb?"+"serial="+serial+"&"+"userId="+userId;
    request.get(, function (err, resp, body) {
        if (err) {
            console.log(funcEP+'Error!');
        } else {
            console.log(funcEP+'OK!');
        }
    });
});

app.get('/devicecb', function(req, res) {
    console.log(funcEP+'/devicecb')
    console.log('serial : '+req.query.serial);
    console.log('userId : '+req.query.userId);
    res.end();
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
