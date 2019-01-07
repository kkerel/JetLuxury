/**
 * Created by Gebru on 12/18/2018.
 */
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

var returnFalse = {
    status: HTTPStatus.PRECONDITION_FAILED,
    msg: '다시 시도해 주세요.'
};

var parseFailed = {
    status: HTTPStatus.NOT_ACCEPTABLE,
    msg: 'JSON file could not be parsed properly'
}
module.exports = {
    /**
     * banner list
     * GET /banner/admin/list
     * @param  start date, keyword, banner registration, col_name: banner_name and banner_coname
     * @returns banner list
     *
     */
    getBannerList: function (req, res) {

        if (!req.query) { // if there is not any search parameters returns error error message
            return res.send({
                status: HTTPStatus.PRECONDITION_FAILED,
                msg: 'getBannerList: No data provided.'
            })
        }
        try {
            var options = {
                method: 'GET',
                url: apiUrl + 'api/banner/admin/list',
                qs: {
                    data: req.query
                }
            };
            request(options, function (error, response, result) {
                if (error) {
                    res.json(error);
                }
                else {
                    try {
                        if (result) {
                            var formatedData = JSON.parse(result);
                            console.log(result)
                            res.json(formatedData);

                        } else {
                            res.json({status: 400, msg: '정보를 가져오지 못하였습니다.'});
                        }
                    } catch (e) {
                        return res.json({method: 'getBannerList', msg: parseFailed})
                    }
                }
            });
        } catch (e) {
            res.send(e.message);
        }
    },
    /**
     * create banner banner
     * POST /banner/create
     * @param banner data
     * @returns banner list
     *
     */
    createBanner: function(req, res){
        var createdBannerList = [];
        if(!req.body.banner_name){
            return res.json({status: HTTPStatus.PRECONDITION_FAILED, msg: 'Cannot read banner name'})
        }
        var options = {
            method: 'POST',
            uri: apiUrl + "api/banner/admin/create",
            json: true,
            body: {
                data: req.body
            }
        };
        // call api
        request(options, function (err, result, data) {
            if(err){
                return res.json({result: 'ERROR', status: returnFalse});
            }else {
                try {
                    createdBannerList =JSON.parse(data); // TODO: check if data is valid json file
                } catch (e) {
                    return res.json({method: 'createCs', parseFailed})
                }
                return res.json({
                    status: HTTPStatus.OK,
                    created: createdBannerList
                })
            }
        });

    },
    /**
     *  disable banner
     *  PUT : /banner/admin/disable
     *  @param : bann_id
     */
    disableBanner: function (req,res){

       if(!req.query){
           return responseJson.make(res, returnFalse);
       }else {
           var bann_id = req.body.bann_id;

           try {

               var resultCode = HTTPStatus.PRECONDITION_FAILED;
               var options = {
                   method: 'PUT',
                   uri: apiUrl +"api/banner/remove",
                   json: true,
                   body: {
                       data: {
                           bann_id: bann_id
                       }
                   }
               }
               // call the APi
               request(options, function (err, result, data) {
                   if (err) {
                       return res.json(returnFalse)
                   }
                   try {
                       if (data.status != 200) {
                           return res.json({status: data.status, msg: data.msg})
                       }
                       message = JSON.parse(data);
                   } catch (e) {
                       return res.json({method: 'removeAdmin', msg: parseFailed})
                   }
                   resultCode = HTTPStatus.OK; // api 호출 성공했을때
                   return res.json(message
                   );
               });

           } catch (e) {
               return responseJson.make(res, returnFalse, e.message);
           }
       }

    },
    /**
     * Edit banner
     * put : /banner/admin/editBanner
     *
     */
    editBanner : function(req,res){
        res.send("working");
    }
}