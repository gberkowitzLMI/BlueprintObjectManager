var router = require('express').Router();
var request = require('request');

var manage = null;

var requireAuthorization = function(req,res,next){
    if(!manage){
        if(!req.headers['authorization'])
        {
            console.log(req.headers);
            res.sendStatus(401);
            return;
        }
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
            res.send(JSON.parse(data.body).organizations.results);
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
    });

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
    });

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
        };
        manage.post({url: 'channel-templates', body: body, json:true}, function(err,data){
            res.send(data);
        });
    });

//DEVICES
router.route('/devices')
    .get(function(req,res){
        //TODO add deviceType and org params
        manage.get('devices',{qs: {"accountId": req.headers['accountid']}}, function(err,data){
            res.send(data.body);
        })
    })
    .post(function(req,res){
        var body = {
          "accountId": req.headers.accountid,
          "deviceTypeId": req.param,
          "organizationId": req.body.organizationId,
          "serialNumber": req.body.serialNumber || ""
        };
        manage.post({url: 'channel-templates', body: body, json:true}, function(err,data){
            res.send(data);
        });
    });


module.exports = router;