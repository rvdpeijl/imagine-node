
// Dependencies
var express 	= require('express');
var router 		= express.Router();

// Models
var Product 	= require('../models/product');
var Category 	= require('../models/category');
var Group 		= require('../models/group');
var Permission 	= require('../models/permission');
var Storage 	= require('../models/storage');

// Routes
Product.methods(['get', 'put', 'post', 'delete']);
Category.methods(['get', 'put', 'post', 'delete']);
Group.methods(['get', 'put', 'post', 'delete']);
Permission.methods(['get', 'put', 'post', 'delete']);
Storage.methods(['get', 'put', 'post', 'delete']);

Product.register(router, '/products');
Category.register(router, '/categories');
Group.register(router, '/groups');
Permission.register(router, '/permissions');
Storage.register(router, '/storage');

// Return router
module.exports = router;