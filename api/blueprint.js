var router = require('express').Router();
var request = require('request');

var manage = null;

var requireAuthorization = function(req,res,next){
    if(!manage){
        manage = request.defaults({
            headers:req.headers['authorization'],
            baseUrl: "https://blueprint.xively.com:443/api/manage/"
        });
    }
    next();
}

router.all('*',requireAuthorization);

router.get('/organizations', function(req,res){
    manage.get('organizations', {qs: req.params.accountId});
    res.send(200);
});

module.exports = router;