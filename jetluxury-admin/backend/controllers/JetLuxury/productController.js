var models  = require('../../models');
var Sequelize = require("sequelize");
var HTTPStatus = require('http-status');
var responseJson = require('../../lib/responseJson');
var async = require('async');
var moment = require('moment')
var request = require('request');

var env       = process.env.NODE_ENV || 'development';
var config    = require('../../config/config.js')[env];
var apiUrl = config.apiUrl+'/';

module.exports = {
    getProductList: function(req, res) {
        try {
            var options = {
                method: 'GET',
                url: apiUrl + 'api/product/list',
                qs: {
                    data: req.query
                }
            };
            request(options, function (error, response, result) {
                if (error) {
                    res.json(error);
                }
                else{
                     if(result){
                        var formatedData = JSON.parse(result);
                        res.json(formatedData);

                    }else{
                        res.json({ status: 400,msg : '정보를 가져오지 못하였습니다.'});
                    }
                }
            });
        } catch (e) {
            res.send(e.message);
        }

    },
    updateProduct: function(req, res) {
        var prod_id = req.query.prod_id
        try {
            var options = {
                method: 'PUT',
                url: apiUrl + 'api/product/update/' + prod_id,
                qs: {
                    data: {
                        prod_main : req.query.prod_main
                    }
                }
            };
            request(options, function (error, response, result) {
                if (error) {
                    res.json(error);
                }
                else{
                    if(result){
                        var formatedData = JSON.parse(result);
                        res.json(formatedData);
                    }else{
                        res.json({ status: 400,msg : '정보를 가져오지 못하였습니다.'});
                    }
                }
            });
        } catch (e) {
            res.send(e.message);
        }

    },
    disableProduct: function(req, res) {
        var prod_id = req.params.prod_id
        try {
            var options = {
                method: 'POST',
                url: apiUrl + 'api/product/' + prod_id + '/remove',
                params: {
                    prod_id : prod_id
                }
            };
            request(options, function (error, response, result) {
                if (error) {
                    res.json(error);
                }
                else{
                    if(result){
                        var formatedData = JSON.parse(result);
                        res.json(formatedData);
                        console.log(formatedData);

                    }else{
                        res.json({ status: 400,msg : '정보를 가져오지 못하였습니다.'});
                    }
                }
            });
        } catch (e) {
            res.send(e.message);
        }

    }

}


