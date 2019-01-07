'use strict';

var express = require('express');
var testRoutes = express.Router();
var testCtrl = require('../controllers/testController');

testRoutes.get('/', testCtrl.getTest);

module.exports = testRoutes;
