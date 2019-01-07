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
    getOrderList: function(req, res) {
        try {
            var options = {
                method: 'GET',
                url: apiUrl + 'api/order/item/list',
                qs: {
                    data: req.query
                }
            };

            request(options, function (error, response, result) {
                if (error) {
                    res.json(error);
                }

                if(!result){
                    res.json({ status: 400,msg : '정보를 가져오지 못하였습니다.'});
                }

                var orderItemList = [];
                var formatedData = [];
                var orderList = [];
                var totalCount = 0;

                if(result){
                    formatedData = JSON.parse(result);
                    orderList = formatedData.data.orderList;
                    totalCount = formatedData.data.itemCount
                }

                if(orderList.length > 0){
                    for(var i in orderList){
                        var member = orderList[i].orderSheet.member;
                        var orderSheet = orderList[i].orderSheet;
                        var delivery = orderList[i].delivery;

                        orderList[i].merchant_uid = orderSheet.merchant_uid;
                        orderList[i].total = orderSheet.ordsheet_total + orderSheet.ordsheet_cost;
                        orderList[i].ordsheet_cost = orderSheet.ordsheet_cost;
                        orderList[i].memb_id = orderSheet.memb_id;
                        orderList[i].memb_code = member.memb_code;
                        orderList[i].ordsheet_created = orderSheet.ordsheet_created

                        if(orderList[i].delivery){
                            orderList[i].deli_serial = delivery.deli_serial;
                            orderList[i].deli_courier = delivery.deli_courier;
                            orderList[i].deli_courier_index = delivery.deli_courier_index;
                        }

                        orderItemList.push(orderList[i]);
                    }
                }

                res.json({
                    orderList: orderItemList,
                    count: totalCount
                })
            });
        } catch (e) {
            res.send(e.message);
        }

    },
    updateOrderList: function(req, res) {
        try {
            if (!req.query.memb_id) {
                var options = {
                    method: 'POST',
                    url: apiUrl + 'api/order/item/update',
                    json: true,
                    body: {
                        data: {
                            ord_id : req.query.ord_id,
                            ordsheet_id : req.query.ordsheet_id,
                            ord_status : req.query.ord_status
                        }
                    }
                };
            } else {
                var options = {
                    method: 'POST',
                    url: apiUrl + 'api/deilvery/add',
                    json: true,
                    body: {
                        data: {
                            memb_id: req.query.memb_id,
                            prod_id: req.query.prod_id,
                            prod_name: req.query.prod_name,
                            ord_id : req.query.ord_id,
                            ordsheet_id : req.query.ordsheet_id,
                            ord_status : req.query.ord_status,
                            deli_serial : req.query.deli_serial,
                            deli_courier_index : req.query.deli_courier_index,
                            deli_courier : req.query.deli_courier
                        }
                    }
                };
            }
            request(options, function (error, response, result) {
                if (error) {
                    res.json(error);
                }
                if(result){
                    res.json(result);
                }else{
                    res.json({ status: 400,msg : '정보를 가져오지 못하였습니다.'});
                }
            });
        } catch (e) {
            res.send(e.message);
        }

    }

}


