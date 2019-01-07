var HTTPStatus = require('http-status');

module.exports.make = function(res, body) {
    var _body = body || {};
    if (! _body.status) {
        _body.status = HTTPStatus.OK;
    }
    if (! _body.msg) {
        _body.msg = '';
    }
    if (! _body.data) {
        _body.data = {};
    }

    return res.status(_body.status).json(_body);
};
