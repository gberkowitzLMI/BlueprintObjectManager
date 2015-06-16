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

//ORGANIZATIONS
router.route('/organizations')
    .get(function(req,res){
        manage.get('organizations', {qs: {"accountId": req.headers['accountid']}}, function(err,data){
            res.send(data.body);
        });
    })
    .post(function(req,res){
        var body = {
            "accountId": req.headers['accountid'],
            "name": req.body['name']
        };
        manage.post({url: 'organizations', body: body, json:true}, function(err,data){
            console.log(err);
            console.log(data);
            res.send(data);
        });
    })


module.exports = router;