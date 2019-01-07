var models  = require('../../models');
var Sequelize = require("sequelize");
var HTTPStatus = require('http-status');
var responseJson = require('../../lib/responseJson');
var async = require('async');
const Op = Sequelize.Op;
var moment = require('moment');

module.exports = {

    getProductReport:function(req,res){
        try
        {
            models.test.findAll()
                .then(function(test) {
                    res.json(test);
                });
        }
        catch (e) {
            res.send("getProductReport :"+e.message)
        }

    }

}