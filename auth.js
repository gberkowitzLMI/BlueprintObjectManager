var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');

var sessions = [];

passport.use(new LocalStrategy(
  function(auth, done) { 
    var options = {
      url: "https://blueprint.xively.com:443/api/manage/accounts",
      headers:{
        Authorization: auth
      }
    };

    request.get(options,function(res){
      //I'm assuming here that the user has the correct accountId
      //if auth tokens are associated with more than one account, this needs to be changed to reflect that
      if(res.accounts && res.accounts.results.length > 0){
        done(null,true);
      } else {
        done(null,false);
      }
    });

}));