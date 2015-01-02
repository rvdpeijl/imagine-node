
// Dependencies
var express 	= require('express');
var router 		= express.Router();

// Models
var Product = require('../models/product');
var Category = require('../models/category');
var Group = require('../models/group');

// Routes
Product.methods(['get', 'put', 'post', 'delete']);
Category.methods(['get', 'put', 'post', 'delete']);
Group.methods(['get', 'put', 'post', 'delete']);

Product.register(router, '/products');
Category.register(router, '/categories');
Group.register(router, '/groups');

// Return router
module.exports = router;