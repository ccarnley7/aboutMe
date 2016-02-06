var express = require('express');
var app = express();
var mongodb = require('mongodb').MongoClient;

var port = process.env.PORT || 98073;
var months = new Array(12);
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

var skillLevel = function (level) {
    if (level >= 100)
        return "Master"
    if (level > 90)
        return "Expert";
    if (level > 75)
        return "Pro";
    if (level > 50)
        return "Apprentice";
    if (level > 25)
        return "Beginner";
    return "Noob";
}


app.use(express.static('public'));
app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    var mongoUrl = process.env.PROD_MONGODB;
    mongodb.connect(mongoUrl, function (err, db) {
        if (err) {
            console.log(err);
        } else {
            var collection = db.collection('person');
            collection.find({
                'firstName': 'Christian',
                'lastName': 'Carnley'
            }).toArray(function (err, docs) {
                res.render('index', {
                    person: docs,
                    months: months
                });
            });
        }
    });
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});