var express = require('express');
var app = express();

var port = process.env.PORT || 9031;

app.get('/', function (req, res) {
    res.send("I hear you");
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});