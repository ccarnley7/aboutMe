var express = require('express');
var resumeRouter = express.Router();
var pdf = require('html-pdf');
var ejs = require('ejs');
var fs = require('fs');
var wkhtmltopdf = require('wkhtmltopdf');
var mongodb = require('mongodb').MongoClient;

var router = function (skillLevel, sortByDate) {

    resumeRouter.route('/file/:username')
        .get(function (req, res) {
            var username = req.params.username;
            res.render('resume',{
                username: username
            });
        });

    resumeRouter.route('/:username')
        .get(function (req, res) {
            var port = process.env.ENV === 'Dev'
            var url = process.env.ENV +  '/resume/file/' + req.params.username
            wkhtmltopdf(url, {
                pageSize: 'letter'
            }).pipe(res);

        });

    return resumeRouter;
};

module.exports = router;