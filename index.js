const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const myLiffId = process.env.MY_LIFF_ID;

app.use(express.static('public'));

app.get('/send-id', function(req, res) {
    res.json({id: myLiffId});
    console.log(req.path);
});

app.get('/device', function(req, res) {
    console.log(req.query.serial);
});

app.get('/profile', function(req, res) {
    console.log(req.query.userId);
    console.log(req.query.displayName);
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
