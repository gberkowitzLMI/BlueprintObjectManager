var request = require('request');

module.exports.doLogin = function(req,res,next){
  var options = {
      url: "https://blueprint.demo.xively.com/api/v1/accounts",
      headers:{
        Authorization: req.body.auth
      }
    };

    request.get(options,function(err,re){
      var response = JSON.parse(re.body)
      //I'm assuming here that the user has the correct accountId
      //if auth tokens are associated with more than one account, this needs to be changed to reflect that
      if(response.accounts && response.accounts.results.length > 0){
        res.status(200);
      } else {
        res.status(401);
      }
      next();
    });
}