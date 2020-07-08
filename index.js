const express = require('express');
const app = express();
var request = require('request');
const port = process.env.PORT || 5000;
const myLiffId = process.env.MY_LIFF_ID;

app.use(express.static('public'));

app.get('/send-id', function(req, res) {
    res.json({id: myLiffId});
    console.log(req.path);
});

app.get('/device', function(req, res) {
    console.log(port);
    console.log(req.query.serial);
    request.post("https://line-starter-v2.herokuapp.com/test", function (err, resp, body) {
        if (err) {
            console.log('Error!');
        } else {
            console.log('OK!');
        }
    });
    res.end();
});

app.get('/profile', function(req, res) {
    console.log(req.query.userId);
    console.log(req.query.displayName);
    res.end();
});

app.get('/test', function(req, res) {
    console.log('/test OK!');
    res.end();
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
