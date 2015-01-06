
// Dependencies
var restful 	= require('node-restful');
var mongoose 	= restful.mongoose;

// Schema
var Permission = new mongoose.Schema({
	name: String,
	slur: String
});

// Return model
module.exports = restful.model('Permission', Permission);