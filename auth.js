var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('./models/User.js').User;

var isValidPassword = function(user,pass){
  //TODO: Hash password
  return user.password == pass;
}

passport.use(new LocalStrategy(
  function(username, password, done) { 
    User.findOne({ 'username' :  username }, 
      function(err, user) {
        if (err) return done(err);

        if (!user){
          console.log('User Not Found with username '+username);
          return done(null, false);        
        }

        if (!isValidPassword(user, password)){
          console.log('Invalid Password');
          return done(null, false);
        }

        return done(null, user);
      }
    );
}));

passport.use(new BearerStrategy(
  function(token, done) { 
    User.findOne({ 'token' :  token }, 
      function(err, user) {
        if (err) return done(err);

        if (!user) return done(null, false)

        return done(null, user);
      }
    );
}));