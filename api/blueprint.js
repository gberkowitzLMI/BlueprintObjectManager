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

//TODO: router.get('*', pagingParams);

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
            res.send(data);
        });
    })

//DEVICE TYPES
router.route('/device-types')
    .get(function(req,res){
        manage.get('device-types',{qs: {"accountId": req.headers['accountid']}}, function(err,data){
            res.send(data.body);
        })
    })
    .post(function(req,res){
        var body = {
            "accountId": req.headers['accountid'],
            "name": req.body['name']
        };
        manage.post({url: 'device-types', body: body, json:true}, function(err,data){
            res.send(data);
        });
    })

//CHANNEL TEMPLATES
router.route('/channel-templates')
    .get(function(req,res){
        //TODO add deviceType param
        manage.get('channel-templates',{qs: {"accountId": req.headers['accountid']}}, function(err,data){
            res.send(data.body);
        })
    })
    .post(function(req,res){
        var body = {
          "entityId": req.body['entityId'],
          "entityType": "deviceType",
          "accountId": req.headers['accountid'],
          "name": req.body['name'],
          "persistenceType": "simple" //TODO add timeSeries
        }
        manage.post({url: 'channel-templates', body: body, json:true}, function(err,data){
            res.send(data);
        });
    })

//DEVICES



module.exports = router;