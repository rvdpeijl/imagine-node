var passport = require('passport');
var Account = require('../models/account');

module.exports = function (app) {

  app.get('/loggedin', function(req, res) { 
    res.send(req.isAuthenticated());
    // res.send(req.isAuthenticated() ? req.user : '0'); 
  });

  app.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            res.send({ 'error' :  err });
        } else {
            res.send({ 'success' :  'User succesfully created!' });
        }
    });
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
    res.send(req.user);
  });

  app.post('/logout', function(req, res){
    req.logOut();
    res.send(200);
  });

  app.get('/ping', function(req, res){
      res.send("pong!", 200);
  });

};