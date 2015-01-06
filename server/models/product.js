
// Dependencies
var restful 	= require('node-restful');
var mongoose 	= restful.mongoose;

// Schema
var productSchema = new mongoose.Schema({
	name: String,
	description: String,
	categoryId: String
});

// Return model
module.exports = restful.model('Product', productSchema);