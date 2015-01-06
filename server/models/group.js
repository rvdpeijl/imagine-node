
// Dependencies
var restful 	= require('node-restful');
var mongoose 	= restful.mongoose;

// Schema
var groupSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	permissions: Array
});

// Return model
module.exports = restful.model('Groups', groupSchema);