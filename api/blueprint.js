var router = require('express').Router();
var request = require('request');
var _ = require('underscore');
var manage = request.defaults({baseUrl: "https://blueprint.demo.xively.com/api/v1/"});
var BlueprintBL = require('../Blueprint');
var BP = null;
var requireAuthorization = function(req,res,next){
    if(!req.headers['authorization'])
    {
        res.sendStatus(401);
        return;
    }
    if(!BP)
        BP = new BlueprintBL(req.headers['authorization'], true);
    next();
}

var queryStringParams = function(req,res,next){
    req.options = {
        accountId: req.headers['accountid'],
        page: req.query.page || 1,
        pageSize: req.query.pageSize || 10,
        sortBy: req.query.sortBy,
        sortOrder: req.query.sortOrder || "asc"
        };
    next();
}

router.all('*',requireAuthorization);

router.get('*', queryStringParams);

//ORGANIZATIONS
router.route('/organizations')
    .get(function(req,res){
        BP.get('organizations',req.options, function(err,data){
            res.send(data);
        });
    });
//     .post(function(req,res){
//         req.options.body = {
//             "accountId": req.headers['accountid'],
//             "name": req.body['name']
//         };
//         BlueprintBL.organization.create(req.options, function(err,data){
//             if(err)
//                 throw err;

//             res.send(data.body);
//         })
//     });

// //DEVICE TEMPLATES
router.route('/device-templates')
    .get(function(req,res){
        BP.get('device-templates',req.options, function(err,data){
            console.log(data);
            res.send(data);
        })
    })
//     .post(function(req,res){
//         var body = {
//             "accountId": req.headers['accountid'],
//             "name": req.body['name']
//         };
//         manage.post(_.extend(req.options,{url: 'devices/templates/', body: body, json:true}), function(err,data){
//             res.send(data.body);
//         });
//     });

// //CHANNEL TEMPLATES
// router.route('/channel-templates')
//     .get(function(req,res){
//         req.options.qs.deviceTemplate = req.query['deviceTemplate'];
//         manage.get('channel-templates',req.options, function(err,data){
//             res.send(data.body);
//         })
//     })
//     .post(function(req,res){
//         var body = {
//           "entityId": req.body['entityId'],
//           "entityType": "deviceTemplate",
//           "accountId": req.headers['accountid'],
//           "name": req.body['name'],
//           "persistenceType": "simple" //TODO add timeSeries
//         };
//         manage.post(_.extend(req.options,{url: 'channel-templates', body: body, json:true}), function(err,data){
//             res.send(data.body);
//         });
//     });

// //DEVICES
// router.route('/devices')
//     .get(function(req,res){
//         //TODO add deviceTemplate and org params
//         manage.get('devices',req.options, function(err,data){
//             res.send(data.body);
//         })
//     })
//     .post(function(req,res){
//         var body = {
//           "accountId": req.headers.accountid,
//           "deviceTemplateId": req.param,
//           "organizationId": req.body.organizationId,
//           "serialNumber": req.body.serialNumber || ""
//         };
//         manage.post(_.extend(req.options,{url: 'channel-templates', body: body, json:true}), function(err,data){
//             res.send(data.body);
//         });
//     });


module.exports = router;