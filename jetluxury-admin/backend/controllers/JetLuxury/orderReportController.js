var models  = require('../../models');
var Sequelize = require("sequelize");
var HTTPStatus = require('http-status');
var responseJson = require('../../lib/responseJson');
var async = require('async');
var request = require('request');
const Op = Sequelize.Op;
var moment = require('moment');

var env       = process.env.NODE_ENV || 'development';
var config    = require('../../config/config.js')[env];
var apiUrl = config.apiUrl+'/admin/';

module.exports ={

    /**
     *
     *
     */
    getOrderReport : function(req,res){
        try {

            var options = {
                method: 'GET',
                url: apiUrl + 'OderPaymentShippingDelivery/report',
                qs: {
                    data: {
                        status: req.query.status,
                        date_term:req.query.date_term,
                        search_col:req.query.search_col,
                        search_keyword:req.query.search_keyword,
                        search_col2:req.query.search_col2,
                        search_date:req.query.search_date,

                    }
                }
            };
            request(options, function (error, response, result) {
                if (error) {
                    res.json({ status: 400,msg : error});
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
            res.send("getOrderReport :"+e.message);
        }

    }

};