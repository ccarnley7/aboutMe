require('newrelic');
var express = require('express');
var app = express();
var mongodb = require('mongodb').MongoClient;
//var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var port = process.env.PORT || 98073;
var months = new Array(12);
months[0] = 'January';
months[1] = 'February';
months[2] = 'March';
months[3] = 'April';
months[4] = 'May';
months[5] = 'June';
months[6] = 'July';
months[7] = 'August';
months[8] = 'September';
months[9] = 'October';
months[10] = 'November';
months[11] = 'December';

var skillLevel = function (level) {
    if (level >= 100) {
        return 'Master';
    }
    if (level > 90) {
        return 'Expert';
    }
    if (level > 75) {
        return 'Pro';
    }
    if (level > 50) {
        return 'Apprentice';
    }
    if (level > 25) {
        return 'Beginner';
    }
    return 'Noob';
};

var sortByDate = function (a, b) {
    return new Date(b.endDate) - new Date(a.endDate);
}


var resumeRouter = require('./src/routes/resumeRoutes')(skillLevel, sortByDate);

app.use(express.static('public'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({
//    extended: true
//}));
app.set('views', 'src/views');
app.set('view engine', 'ejs');
app.use('/resume', resumeRouter);
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    name: 'carnley.me_cookie',
    resave: true,
    saveUninitialized: true
}));
//require('./src/config/passport')(app);

app.get('/', function (req, res) {
    var mongoUrl = process.env.PROD_MONGODB;
    mongodb.connect(mongoUrl, function (err, db) {
        if (err) {
            console.log(err);
        } else {
            var collection = db.collection('users');
            collection.findOne({'username':'ccarnley'}, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    var person = result;
                    person.jobs.sort(sortByDate);
                    person.education.sort(sortByDate);
                    person.skills.sort(function (a, b) {
                        return b.level - a.level;
                    })
                    res.render('index', {
                        person: person,
                        months: months,
                        skillLevel: skillLevel
                    });
                }
            });

        }
    });
});

app.listen(port, function (err) {
    if (err)
        console.log('error: ', err);
    console.log('running server on port ' + port);
});