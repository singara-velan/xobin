var express = require('express');
var parseString = require('xml2js').parseString;
var router = express.Router();

var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();


router.route('/posts')
    .get(function(req, res) {
        fs.readFile('G:/Xobin/dumplist' + '/Posts.xml', function(err, data) {
            parser.parseString(data, function(err, result) {
                res.json(result);
                console.log('Done');
            });
        });

    })


    router.route('/users')
        .get(function(req, res) {
            fs.readFile('G:/Xobin/dumplist' + '/Users.xml', function(err, data) {
                parser.parseString(data, function(err, result) {
                    res.json(result);
                    console.log('Done');
                });
            });

        })

module.exports = router;
