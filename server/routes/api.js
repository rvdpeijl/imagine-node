
// Dependencies
var express 	= require('express');
var router 		= express.Router();

// Models
var Product = require('../models/product');
var Category = require('../models/category');

// Routes
Product.methods(['get', 'put', 'post', 'delete']);
Category.methods(['get', 'put', 'post', 'delete']);

Product.register(router, '/products');
Category.register(router, '/categories');


// Return router
module.exports = router;