'use strict'

var express = require('express');
var indexRoutes = express.Router();

// member statistics ============================================
var memberCtr = require('../controllers/JetLuxury/newMemberController');

indexRoutes.get('/member/report', memberCtr.getMember);
indexRoutes.get('/member/status', memberCtr.getMemberStatus);
// membership management ============================================
var memberCtr1 = require('../controllers/JetLuxury/memberJoinController');
indexRoutes.get('/member/list', memberCtr1.getMember);
indexRoutes.put('/member/remove', memberCtr1.removeMember);
indexRoutes.put('/member/edit', memberCtr1.editMember);
indexRoutes.get('/member/ordersum', memberCtr1.getOrderSum);
indexRoutes.get('/member/ordercount', memberCtr1.getOrderCount);
indexRoutes.get('/member/point', memberCtr1.getPoint);
// admin management ============================================
var adminCtr = require('../controllers/JetLuxury/adminJoinController');

indexRoutes.post('/admin/login', adminCtr.adminLogin);
indexRoutes.get('/admin/list', adminCtr.getadmin);
indexRoutes.put('/admin/remove', adminCtr.removeAdmin);
indexRoutes.post('/admin/create', adminCtr.createAdmin);
indexRoutes.put('/admin/edit', adminCtr.editAdmin);
indexRoutes.put('/admin/role', adminCtr.saveRole);
//=====================================
//Sales and order Statistics
//=====================================

var salesCtrl = require('../controllers/JetLuxury/salesReportController');
indexRoutes.get('/sales/report', salesCtrl.getMass);


//=====================================
//Delivery Routes
//=====================================

var OrderandShippingCtrl = require('../controllers/JetLuxury/orderReportController');
indexRoutes.get('/OderPaymentShippingDelivery/report', OrderandShippingCtrl.getOrderReport);

//=====================================
//Product Routes
//=====================================

var productController = require('../controllers/JetLuxury/productController');
indexRoutes.get('/products', productController.getProductList);
indexRoutes.get('/products/update', productController.updateProduct);
indexRoutes.post('/products/disable', productController.disableProduct);

//=====================================
//Order Routes
//=====================================

var orderController = require('../controllers/JetLuxury/orderController');
indexRoutes.get('/order', orderController.getOrderList);
indexRoutes.get('/order/update', orderController.updateOrderList);

//=====================================
//brand banner Routes
//=====================================

var brandController = require('../controllers/JetLuxury/brandController');
indexRoutes.get('/brand/admin/list',brandController.getBrandList);
indexRoutes.post('/brand/admin/create',brandController.upload.single('file'),brandController.updateBrandImage);
//=======================================
// Event Banner Routes
//=======================================
var bannCtrl = require('../controllers/JetLuxury/bannerController');
indexRoutes.get('/banner/admin/list',bannCtrl.getBannerList);
indexRoutes.put('/banner/admin/disable',bannCtrl.disableBanner);
indexRoutes.put('/banner/admin/edit',bannCtrl.editBanner);
module.exports = indexRoutes;



