
// Dependencies
var express 		= require('express'),
	mongoose		= require('mongoose'),
	bodyParser 		= require('body-parser'),
	morgan			= require('morgan'),
	passport		= require('passport'),
	LocalStrategy 	= require('passport-local').Strategy,
	session			= require('express-session');

// MongoDB
mongoose.connect('mongodb://localhost/imaginedb');

// Express
var app = express();

app.use(session({
	secret: 'kaolofrikandel',
	resave: false,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', require('./server/routes/api'));
app.use('/client', express.static(__dirname + '/client'));
app.use('/modules', express.static(__dirname + '/client/modules'));

var Account = require('./server/models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

require('./server/routes/account')(app);

// Catch all route
app.get('*', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

// Start server
app.listen(3000, function() {
	console.log('API is running on port 3000');
});