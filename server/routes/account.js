var passport = require('passport');
var Account = require('../models/account');

module.exports = function (app) {

  var auth = function(req, res, next){
    // if (!req.isAuthenticated()) 
    //   res.sendStatus(401);
    // else
      next();
  };

  app.get('/api/accounts', auth, function(req, res) {
    Account.find({}, function(err, accounts) {
      var accountMap = {};

      accounts.forEach(function(account) {
        accountMap[account._id] = account;
      });

      res.send(accountMap);  
    });
  });

  app.delete('/api/accounts/:id', auth, function(req, res) {
    Account.remove({ _id : req.params.id }, function(err) {
        if (err) {
            res.send({ 'error' :  err });
        } else {
            res.send({ 'success' :  req.params.id });
        }
    });
  });

  app.put('/api/accounts/:id', auth, function(req, res) {
    Account.update({_id: req.params.id}, req.body, {upsert: true}, function(err) {
      if (err) {
        res.send({ 'error' :  err });
      } else {
        res.send({ 'success' :  req.params.id });
      }
    });
  });

  app.get('/api/accounts', auth, function(req, res) {
    Account.find({}, function(err, accounts) {
      var accountMap = {};

      accounts.forEach(function(account) {
        accountMap[account._id] = account;
      });

      res.send(accountMap);  
    });
  });

  app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0'); 
  });

  app.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username, groupId : req.body.groupId }), req.body.password, function(err, account) {
        if (err) {
            res.send({ 'error' :  err });
        } else {
            res.send({ 'success' :  account });
        }
    });
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
    res.send(req.user);
  });

  app.post('/logout', function(req, res){
    req.logOut();
    res.sendStatus(200);
  });

  app.get('/ping', function(req, res){
      res.sendStatus("pong!", 200);
  });

};