'use strict'

var request = require('request');
var async = require('async');
const axios = require('axios');
var HTTPStatus = require('http-status');
// var apiUrl = 'http://api.dev.jet-luxury.com/api';
var jwt = require('jsonwebtoken');

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
 * admin list
 * GET admin/list
 * @param col_name, keyword
 * @return list
 *
 */

function getadmin (req, res){
    var adminList = [];
    var search = req.query.col_name // accepts the column name
    try {
        var resultCode = HTTPStatus.PRECONDITION_FAILED;
        var options = {
            method: 'GET',
            uri: apiUrl + "/admin/list",
            qs: {
                data: {
                    search: search,
                    keyword: req.query.keyword
                }
            }
        }
        // call the APi
        request(options, function (err, result, data) {
            if (err) {
                return res.json(returnFalse)
            }
            var adminCount = 0;
            try{
                adminList = JSON.parse(data);
            }catch(e){
                return res.json({method: 'getadmin', msg: parseFailed})
            }
            try {
                if (adminList.admin.length > 0) {
                    for (var i in adminList.admin) {
                        if (adminList.admin[i].admin_status >= 1) {
                            adminCount++;
                        }
                    }
                }
            }catch(e){
                return res.json({method: 'getadmin', msg: "admin list is empty"})
            }
            resultCode = HTTPStatus.OK; // api 호출 성공했을때
            return res.json(
                {
                    status: resultCode,
                    available: adminCount,
                    admin: adminList,
                });
        });

    } catch (e) {
        return responseJson.make(res, returnFalse,e.message);
    }
}

/**
 * admin remove
 * PUT admin/remove
 * @param admin_id
 * @return list
 *
 */

function removeAdmin (req, res){
    var message = [];
    var admin_id = req.body.admin_id // accepts the admin_id
    try {
        var resultCode = HTTPStatus.PRECONDITION_FAILED;
        var options = {
            method: 'PUT',
            uri: apiUrl + "/admin/remove",
            json: true,
            body: {
                data: {
                    admin_id: admin_id
                }
            }
        }
        // call the APi
         request(options, function (err, result, data) {
            if (err) {
                return res.json(returnFalse)
            }
            try{
                console.log(data)
                if(data.status!=200)
                {
                    return res.json({status:data.status, msg: data.msg})
                }
                message = JSON.parse(data);
            }catch(e){
                return res.json({method: 'removeAdmin', msg: parseFailed})
            }
            resultCode = HTTPStatus.OK; // api 호출 성공했을때
            return res.json(

                    message
                );
        });

    } catch (e) {
        return responseJson.make(res, returnFalse,e.message);
    }
}/**
 * admin role setting
 * PUT admin/role
 * @param admin_id
 * @return message
 *
 */

function saveRole (req, res){
    var message = [];
    var admin_id = req.body.admin_id // accepts the admin_id
    var admin_level= req.body.role
    if (!admin_id || !admin_level) { // TODO check if there is a valid redirect url provided
        console.log('No valid data provided!')
        return res.send({
            status: HTTPStatus.PRECONDITION_FAILED,
            msg: 'setting access rights: No data provided.'
        })
    }else{
            try {

                var resultCode = HTTPStatus.PRECONDITION_FAILED;
                var options = {
                    method: 'PUT',
                    uri: apiUrl + "/admin/role",
                    json: true,
                    body: {
                        data: {
                            admin_id: admin_id,
                            admin_level:admin_level
                        }
                    }
                }
                // call the APi
                request(options, function (err, result, data) {
                    if (err) {
                        // return responseJson.make(res, returnFalse);
                        return res.json(returnFalse)
                    }
                    try {
                        console.log(data)
                        if (data.status != 200) {
                            return res.json({status: data.status, msg: data.msg})
                        }
                        message = JSON.parse(data);
                    } catch (e) {
                        return res.json({method: 'saveRole', msg: parseFailed})
                    }
                    resultCode = HTTPStatus.OK; // api 호출 성공했을때
                    return res.json(
                        message
                    );
                });

            } catch (e) {
                return responseJson.make(res, returnFalse, e.message);
            }
        }
}


/**
 * admin edit
 * PUT admin/edit
 * @param admin_id
 * @return success message
 *
 */

function editAdmin (req, res){
    var message = [];
    var admin_id = req.body.admin_id // accepts the admin_id
    try {
        var resultCode = HTTPStatus.PRECONDITION_FAILED;
        var options = {
            method: 'PUT',
            uri: apiUrl + "/admin/edit",
            json: true,
            body: {
                data: {
                    admin_id: admin_id,
                    admin_status: req.body.admin_status,
                    admin_contact: req.body.admin_contact
                }
            }
        }
        // call the APi
        request(options, function (err, result, data) {
            if (err) {
                return res.json(returnFalse)
            }
            try{
                if(data.status!=200)
                {
                    return res.json({status:data.status, msg: data.msg})
                }
                message = JSON.parse(data);
            }catch(e){
                return res.json({method: 'editAdmin', msg: parseFailed})
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
 *
 * POST admin/create
 * Params : admin data
 * returns success message
 */


function createAdmin(req, res) {
    var returnFalse = {
        status: HTTPStatus.PRECONDITION_FAILED,
        msg: '다시 시도해 주세요.....'
    };
    if (!req.body) { // TODO check if there is a valid redirect url provided
        return res.send({
            status: HTTPStatus.PRECONDITION_FAILED,
            msg: 'createAdmin: No data provided.'
        })
    } else {
        try {
            var admin;
            var options = {
                method: 'POST',
                uri: apiUrl + "/admin/create",
                json: true,
                body: {
                    data: {
                        admin_id: req.body.admin_id,
                        admin_name: req.body.admin_name,
                        admin_pw: req.body.admin_pw,
                        admin_contact: req.body.admin_contact ,
                        admin_level: req.body.admin_level
                    }
                }

            };
            request(options, function (err, response, body) {
                if (err) {
                    return res.json({error: returnFalse}) // TODO: user should be redirected to login page with appropriate message
                } else {
                    try {
                        admin = body;
                    } catch (e) {
                        return res.json({method: 'createadmin', msg: parseFailed})
                    }
                    try {
                        if (admin.data) {
                            req.session.admin_id = req.body.admin_id;
                            req.session.admin_name = req.body.admin_name;
                            return res.json(admin.msg)
                        } else {
                            return res.json(admin.msg)
                        }
                    } catch (e) {
                        res.json({method: "getadmin", msg: "No admin data found."})
                    }
                }
            });


        } catch (e) {
            res.send(e.message)
        }
    }

}
/*
*  returns authenticated admin
* GET /admin/login
* @param req
* @param res
* */
function adminLogin(req, res) {
    var returnFalse = {
        admin: {},
        status: HTTPStatus.PRECONDITION_FAILED,
        msg: '다시 시도해 주세요.....'
    };
    if (!req.body.admin_id || !req.body.admin_pw) {
        return res.json({
            admin: {},
            status: HTTPStatus.PRECONDITION_FAILED,
            msg: 'Username or password is not provided'
        });
    } else {
        try {
            var user;
            var options = {
                method: 'POST',
                uri: apiUrl + "/findAndLogin",
                json: true,
                body: {
                    data: {
                        admin_id: req.body.admin_id,
                        admin_pw: req.body.admin_pw
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
                            req.session.admin_id = req.query.admin_id;
                            req.session.admin_name = user.data.admin_name;
                            try {
                                const token = jwt.sign({id: user.data.admin_id}, 'secret', {expiresIn: 86400}); // expires in 24 hours
                                var role=null
                                if(user.data.admin_level==1) {
                                    role='admin';
                                } else if(user.data.admin_level==2) {
                                    role='employee';
                                } else if(user.data.admin_level==3) {
                                    role='partime';
                                } else if(user.data.admin_level==4) {
                                    role='intern';
                                }
                            res.json({admin:user, token: token, role: role})
                            }catch (e) {
                                res.json({method:"adminLogin", msg:e.message})
                            }
                        } else {
                            return res.json({admin:{},msg:user.msg})
                        }
                    } catch (e) {
                        res.json({method:"admin login", msg: "No admin login data found"})
                    }
                }
            });
        }
        catch (e) {
            console.log(e) // TODO: redirect to login page with appropriate message
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

module.exports = {
    createAdmin,
    editAdmin,
    adminLogin,
    getadmin,
    removeAdmin,
    saveRole,
    passwordReset
}


