var express = require('express');
var resumeRouter = express.Router();
var pdf = require('html-pdf');
var ejs = require('ejs');
var fs = require('fs');

var router = function (skillLevel, sortByDate) {

    resumeRouter.route('/:username')
        .get(function (req, res) {
            var username = req.params.username;
            console.log(process.cwd());
            var html = ejs.render(fs.readFileSync('./src/views/resume.ejs', 'utf8'), {
                username: username
            });
            var options = {
                format: 'Letter',
                orientation: 'portrait',
                type: 'pdf'
            };
            var fileName = './public/userData/' + username + '/generatedDocs/' + username + '_resume.pdf';
            pdf.create(html, options).toFile(fileName, function (err, pdfdata) {
                if (err) return console.log(err);



                fs.readFile(fileName, function (err, data) {
                    res.contentType("application/pdf");
                    res.send(data);
                });
            });
        });

    return resumeRouter;
};

module.exports = router;