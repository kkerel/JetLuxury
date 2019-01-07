'use strict';

var models  = require('./../models');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.js')[env];
var apiUrl = config.apiUrl;


function getTest (req, res) {
    models.test.findAll()
        .then(function(test) {
            res.json(test);
        });
}

module.exports = {
    getTest
};