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

var queryStringParams = function(req,res,next){
    req.bpQs = {
        qs: {
            accountId: req.headers['accountid'],
            page: req.query.page || 1,
            pageSize: req.query.pageSize || 10,
            sortBy: req.query.sortBy,
            sortOrder: req.query.sortOrder || "asc"
        }
    };
    next();
}

router.all('*',requireAuthorization);

router.get('*', queryStringParams);

//ORGANIZATIONS
router.route('/organizations')
    .get(function(req,res){
        manage.get('organizations', req.bpQs, function(err,data){
            res.send(JSON.parse(data.body));
        });
    })
    .post(function(req,res){
        var body = {
            "accountId": req.headers['accountid'],
            "name": req.body['name']
        };
        manage.post({url: 'organizations', body: body, json:true}, function(err,data){
            res.send(JSON.parse(data.body));
        });
    });

//DEVICE TYPES
router.route('/device-types')
    .get(function(req,res){
        manage.get('device-types',req.bpQs, function(err,data){
            res.send(JSON.parse(data.body));
        })
    })
    .post(function(req,res){
        var body = {
            "accountId": req.headers['accountid'],
            "name": req.body['name']
        };
        manage.post({url: 'device-types', body: body, json:true}, function(err,data){
            res.send(JSON.parse(data.body));
        });
    });

//CHANNEL TEMPLATES
router.route('/channel-templates')
    .get(function(req,res){
        req.bpQs.deviceType = req.query['deviceType'];
        manage.get('channel-templates',req.bpQs, function(err,data){
            res.send(JSON.parse(data.body));
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
            res.send(JSON.parse(data.body));
        });
    });

//DEVICES
router.route('/devices')
    .get(function(req,res){
        //TODO add deviceType and org params
        manage.get('devices',req.bpQs, function(err,data){
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
            res.send(JSON.parse(data.body));
        });
    });


module.exports = router;