var router = require('express').Router();
var request = require('request');

var manage = null;

var requireAuthorization = function(req,res,next){
    if(!manage){
        manage = request.defaults({
            headers:{
                Authorization: req.headers['authorization']
            },
            baseUrl: "https://blueprint.xively.com:443/api/manage/"
        });
    }
    next();
}

router.all('*',requireAuthorization);

router.route('/organizations')
    .get(function(req,res){
        manage.get('organizations', {qs: {"accountId": req.query.accountId}}, function(err,data){
            console.log(err);
            console.log(data);
        });
        res.send(200);
    })


module.exports = router;