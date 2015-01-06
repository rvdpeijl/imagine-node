
// Dependencies
var restful 	= require('node-restful');
var mongoose 	= restful.mongoose;

// Schema
var Storage = new mongoose.Schema({
	name: String,
	description: String,
	supply: [{
		productId: String,
		amount: Number
	}]
});

// Return model
module.exports = restful.model('Storage', Storage);