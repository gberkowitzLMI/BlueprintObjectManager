var router = require('express').Router();
var request = require('request');
var _ = require('underscore');
var manage = request.defaults({baseUrl: "https://blueprint.xively.com:443/api/manage/"});
var BlueprintBL = require('../Blueprint');

var requireAuthorization = function(req,res,next){
    if(!req.headers['authorization'])
    {
        res.sendStatus(401);
        return;
    }
    req.options = {headers: {Authorization: req.headers['authorization']}};
    next();
}

var queryStringParams = function(req,res,next){
    _.extend(req.options,{
        qs: {
            accountId: req.headers['accountid'],
            page: req.query.page || 1,
            pageSize: req.query.pageSize || 10,
            sortBy: req.query.sortBy,
            sortOrder: req.query.sortOrder || "asc"
        }
    });
    next();
}

router.all('*',requireAuthorization);

router.get('*', queryStringParams);

//ORGANIZATIONS
router.route('/organizations')
    .get(function(req,res){
        manage.get('organizations', req.options, function(err,data){
            res.send(data.body);
        });
    })
    .post(function(req,res){
        req.options.body = {
            "accountId": req.headers['accountid'],
            "name": req.body['name']
        };
        BlueprintBL.organization.create(req.options, function(err,data){
            res.send(data.body);
        })
    });

//DEVICE TYPES
router.route('/device-types')
    .get(function(req,res){
        manage.get('device-types',req.options, function(err,data){
            res.send(data.body);
        })
    })
    .post(function(req,res){
        var body = {
            "accountId": req.headers['accountid'],
            "name": req.body['name']
        };
        manage.post(_.extend(req.options,{url: 'device-types', body: body, json:true}), function(err,data){
            res.send(data.body);
        });
    });

//CHANNEL TEMPLATES
router.route('/channel-templates')
    .get(function(req,res){
        req.options.qs.deviceType = req.query['deviceType'];
        manage.get('channel-templates',req.options, function(err,data){
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
        manage.post(_.extend(req.options,{url: 'channel-templates', body: body, json:true}), function(err,data){
            res.send(data.body);
        });
    });

//DEVICES
router.route('/devices')
    .get(function(req,res){
        //TODO add deviceType and org params
        manage.get('devices',req.options, function(err,data){
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
        manage.post(_.extend(req.options,{url: 'channel-templates', body: body, json:true}), function(err,data){
            res.send(data.body);
        });
    });


module.exports = router;