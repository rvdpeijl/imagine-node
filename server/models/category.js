
// Dependencies
var restful 	= require('node-restful');
var mongoose 	= restful.mongoose;

// Schema
var categorySchema = new mongoose.Schema({
	name: String
});

// Return model
module.exports = restful.model('Category', categorySchema);