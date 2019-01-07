'use strict'

var request = require('request');
var async = require('async');
const axios = require('axios');
var HTTPStatus = require('http-status');
//var responseJson = require('../lib/responseJson');

var env       = process.env.NODE_ENV || 'development';
var config    = require('../../config/config.js')[env];
var apiUrl = config.apiUrl+'/admin';

var returnFalse = {
    status: HTTPStatus.PRECONDITION_FAILED,
    msg: '다시 시도해 주세요.'
};

var parseFailed = {
    status: HTTPStatus.NOT_ACCEPTABLE,
    msg: 'JSON file could not be parsed properly'
}
/**
 *
 * POST /createUser
 * Params : member data
 *
 */


function createMember(req, res) {
    var returnFalse = {
        status: HTTPStatus.PRECONDITION_FAILED,
        msg: '다시 시도해 주세요.....'
    };
    if (!req.body) { // TODO check if there is a valid redirect url provided
        return res.send({
            status: HTTPStatus.PRECONDITION_FAILED,
            msg: 'createUser: No data provided.'
        })
    } else {
        try {
            var member;
            var options = {
                method: 'POST',
                uri: apiUrl + "/createUser",
                json: true,
                body: {
                    data: {
                        memb_id: req.body.memb_id ? req.body.memb_id : 'test@test.id',
                        memb_pw: req.body.memb_pw ? req.body.memb_pw : 'password',
                        memb_token: req.body.memb_token ? req.memb_token : 'token',
                        memb_name: req.body.memb_name ? req.body.memb_name : 'test_name',
                        memb_phone: req.body.memb_phone ? req.body.memb_phone : '000-0000-0000',
                        memb_fbook: req.body.memb_fbook ? req.body.memb_fbook : 'n',
                        memb_google: req.body.memb_google ? req.body.memb_google : 'n',
                        memb_naver: req.body.memb_naver ? req.body.memb_naver : 'n',
                        memb_status: 1
                    }
                }
                }
            request(options, function (err, response, body) {
                if (err) {
                    return res.json({error: returnFalse}) // TODO: user should be redirected to login page with appropriate message
                } else {
                    member = body; // JSON.parse(body);
                    if (member.data) {
                        req.session.memb_id = req.body.memb_id;
                        req.session.name = req.body.memb_name;
                        return res.redirect('http://localhost:3000/mypagemain');
                    } else {
                        return res.redirect('http://localhost:3000/')
                    }
                }

            });


        } catch (e) {
            return res.json(e.message)
        }
    }

}

function memberLogin(req, res) {
    var returnFalse = {
        status: HTTPStatus.PRECONDITION_FAILED,
        msg: '다시 시도해 주세요.....'
    };
    if (!req.query.memb_id || !req.query.memb_pw) {
        return res.json({
            status: HTTPStatus.PRECONDITION_FAILED,
            msg: 'Username or password is not provided'
        });
    } else {
        try {
            var user;
            var options = {
                method: 'GET',
                uri: apiUrl + "/findAndLogin",
                json: true,
                body: {
                    data: {
                        memb_id: req.query.memb_id,
                        memb_pw: req.query.memb_pw
                    }
                },
                qs: {
                    data: {
                        memb_id: req.query.memb_id,
                        memb_pw: req.query.memb_pw
                    }
                }
            };
            request(options, function (err, response, body) {
                if (err) {
                    return res.json({error: returnFalse}) // TODO: user should be redirected to login page with appropriate message
                } else {
                    user = body;
                    try {
                        if (user.data) {
                            req.session.memb_id = req.query.memb_id;
                            req.session.memb_name = user.data.memb_name;
                            res.json(user)
                        } else {
                            return res.json(user)
                        }
                    } catch (e) {
                        res.json({method: "member login", msg: e.message})
                    }
                }
            });
        }
        catch (e) {
            return res.json(e.message)
        }
    }
}
function passwordReset(req, res) {
    var returnFalse = {
        status: HTTPStatus.PRECONDITION_FAILED,
        msg: '다시 시도해 주세요.....'
    };
    if (!req.params.memb_id) {
        return res.json(returnFalse);
    } else {
        var ID = req.params.memb_id;
        try {
            var user; //
            var options = {
                method: 'PUT',
                uri: apiUrl + '/reset-pw/' + ID,
                json: true,
                body: {
                    data: {
                        memb_pw_old: req.body.memb_pw_old,
                        memb_pw_new: req.body.memb_pw_new
                    }
                },
                qs: {
                    data: {
                        //
                    }
                }
            };
            request(options, function (err, response, body) {
                if (err) {
                    console.log(returnFalse)
                    return res.json(returnFalse);
                } else {
                    user = body;
                    console.log('====================================');
                    console.log(user);
                    console.log('=====================================');
                    if (user.data) {
                        return res.redirect('http://localhost:3000/mypagemain');
                    } else {
                        console.log(user.msg);
                        return res.redirect('http://localhost:3000/');
                    }

                }
            })
        } catch (e) {
            var error = {
                data: null,
                status: HTTPStatus.REQUEST_TIMEOUT,
                msg: 'Unexpected error occurred. Please try again'
            };
            console.log(error);
            return res.json(error)
        }
    }
}
/**
 * point score list
 * GET /member/point
 * @return point score list
 *
 */

function getPoint(req, res) {
    try {
        var pointList =[];
        var resultCode = HTTPStatus.PRECONDITION_FAILED;
        var options = {
            method: 'GET',
            uri: apiUrl + "/member/point"
        }
        // call the APi
        request(options, function (err, result, data) {
            if (err) {
                return returnFalse
            }
            try{
                pointList = JSON.parse(data);
            }catch(e){
                return res.json({method: 'getMember', msg: parseFailed})
            }
            resultCode = HTTPStatus.OK; // api 호출 성공했을때
            return res.json({ status: resultCode, point: pointList });
        });

    } catch (e) {
        return responseJson.make(res, returnFalse,e.message);
    }
}/**
 * order sum list
 * GET /member/ordersum
 *
 * @return sum orders quantity
 *
 */

function getOrderSum(req, res) {
    try {
        var orderSum =[];
        var resultCode = HTTPStatus.PRECONDITION_FAILED;
        var options = {
            method: 'GET',
            uri: apiUrl + "/member/ordersum"
        }
        // call the APi
        request(options, function (err, result, data) {
            if (err) {
                return returnFalse
            }
            try{
                orderSum = JSON.parse(data);
            }catch(e){
                return res.json({method: 'getMember', msg: parseFailed})
            }
            resultCode = HTTPStatus.OK; // api 호출 성공했을때
            return res.json({ status: resultCode, sum: orderSum });
        });

    } catch (e) {
        return responseJson.make(res, returnFalse,e.message);
    }
}
/* order count list
 * GET /member/ordercount
 * @param
 * @return sum orders quantity
 *
 */

function getOrderCount(req, res) {
    try {
        var orderCount =[];
        var resultCode = HTTPStatus.PRECONDITION_FAILED;
        var options = {
            method: 'GET',
            uri: apiUrl + "/member/ordercount"
        }
        // call the APi
        request(options, function (err, result, data) {
            if (err) {
                // return responseJson.make(res, returnFalse);
                return returnFalse
            }
            try{
                orderCount = JSON.parse(data);
            }catch(e){
                return res.json({method: 'getMember', msg: parseFailed})
            }
            resultCode = HTTPStatus.OK; // api 호출 성공했을때
            return res.json({ status: resultCode, sum: orderCount });
        });

    } catch (e) {
        return responseJson.make(res, returnFalse,e.message);
    }
}
/**
 * member list
 * GET member/list
 * @param date_term like 7 days, 3 months, keyword,memb_status, date_range
 * @return list
 *
 */


function getMember (req, res){
    var memberList = [];
    var startDate = req.query.startDate
    var endDate = req.query.endDate
    var memb_status = req.query.memb_status
    var keyword= req.query.keyword
    try {
        var resultCode = HTTPStatus.PRECONDITION_FAILED;
        var options = {
            method: 'GET',
            uri: apiUrl + "/member/list",
            qs: {
                data: {
                    startDate: startDate,
                    endDate: endDate,
                    memb_status: memb_status,
                    keyword: keyword
                }
            }
        }
        // call the APi
        request(options, function (err, result, data) {
            if (err) {
                // return responseJson.make(res, returnFalse);
                return res.json(returnFalse)
            }
            var memberCount = 0;
            try{
                memberList = JSON.parse(data);
            }catch(e){
                return res.json({method: 'getMember', msg: parseFailed})
            }
            try {
                if (memberList.member.length > 0) {
                    for (var i in memberList.member) {
                        if (memberList.member[i].memb_status >= 1) {
                            memberCount++;
                        }
                    }
                }
            } catch (e){
                return res.json({method: 'getMember', msg: "member list is empty"})
            }
            resultCode = HTTPStatus.OK; // api 호출 성공했을때
            return res.json(
                {
                    status: resultCode,
                    available: memberCount,
                    member: memberList
                });
        });

    } catch (e) {
        return responseJson.make(res, returnFalse,e.message);
    }
}


/**
 * member edit
 * PUT /member/edit
 * @param memb_id
 * @return success message
 *
 */

function editMember (req, res){
    var message = [];
    var memb_id = req.body.memb_id // accepts the member_id
    try {
        var resultCode = HTTPStatus.PRECONDITION_FAILED;
        var options = {
            method: 'PUT',
            uri: apiUrl + "/member/edit",
            json: true,
            body: {
                data: {
                    memb_id: memb_id,
                    memb_status: req.body.memb_status
                }
            }
        }
        // call the APi
        request(options, function (err, result, data) {
            if (err) {
                // return responseJson.make(res, returnFalse);
                return res.json(returnFalse)
            }
            try{
                if(data.status!=200)
                {
                    return res.json({status:data.status, msg: data.msg})
                }
                message = JSON.parse(data);
            }catch(e){
                return res.json({method: 'editMember', msg: parseFailed})
            }
            resultCode = HTTPStatus.OK; // api 호출 성공했을때
            return res.json(

                message
            );
        });

    } catch (e) {
        return responseJson.make(res, returnFalse,e.message);
    }
}

/**
 * member remove
 * PUT member/remove
 * @param memb_id
 * @return list
 *
 */

function removeMember (req, res){
    var message = [];
    var memb_id = req.body.memb_id // accepts the member_id
    try {
        var resultCode = HTTPStatus.PRECONDITION_FAILED;
        var options = {
            method: 'PUT',
            uri: apiUrl + "/member/remove",
            json: true,
            body: {
                data: {
                    memb_id: memb_id
                }
            }
        }
        // call the APi
        request(options, function (err, result, data) {
            if (err) {
                // return responseJson.make(res, returnFalse);
                return res.json(returnFalse)
            }
            try{
                if(data.status!=200)
                {
                    return res.json({status:data.status, msg: data.msg})
                }
                message = JSON.parse(data);
            }catch(e){
                return res.json({method: 'removeMember', msg: parseFailed})
            }
            resultCode = HTTPStatus.OK; // api 호출 성공했을때
            return res.json(

                message
            );
        });

    } catch (e) {
        return responseJson.make(res, returnFalse,e.message);
    }
}

module.exports = {
    createMember,
    memberLogin,
    getMember,
    editMember,
    removeMember,
    getPoint,
    getOrderCount,
    getOrderSum,
    passwordReset
}


