
// Dependencies
var mongoose 				= require('mongoose'),
    passportLocalMongoose 	= require('passport-local-mongoose');

// Schema
var Account = new mongoose.Schema({
    username: String,
    password: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);