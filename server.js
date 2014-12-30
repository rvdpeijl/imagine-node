
// Dependencies
var express 		= require('express'),
	mongoose		= require('mongoose'),
	bodyParser 		= require('body-parser');

// MongoDB
mongoose.connect('mongodb://localhost/imaginedb');

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api', require('./server/routes/api'));
app.use('/client', express.static(__dirname + '/client'));
app.use('/modules', express.static(__dirname + '/client/modules'));

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

// Start server
app.listen(3000);
console.log('API is running on port 3000');