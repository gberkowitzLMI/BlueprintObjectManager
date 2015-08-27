var request = require('request');
var bp;
var _ = require('underscore');

var Blueprint = function(basicAuth, useDemo) {
    if(useDemo)
        bp = request.defaults({baseUrl: 'https://blueprint.demo.xively.com/api/v1/'});
    else {
        bp = request.defaults({baseUrl: 'https://blueprint.xively.com/api/v1/'});
    }

    var objectAPIMapping= 
    {
        'organization-template': 'organizations/templates',
        'organization-templates': 'organizations/templates', //singular or pluralized

        'device-template': 'devices/templates',
        'device-templates': 'devices/templates',
        'device': 'devices',

        'channel-template': 'channels/templates',
        'channel-templates': 'channels/templates',

        'organization': 'organizations',

        'end-user-template': 'end-users/templates',
        'end-user-templates': 'end-users/templates',
        'end-user': 'end-users',

        'credentials': 'access/mqtt-credentials'
    };

    //do some auth stuff; this will change
    this.auth = basicAuth;
    this.create = function(objectType, body, callback){
        var data = {
            headers: {'Authorization': auth},
            body:body,
            url: objectAPIMapping[objectType] || objectType, //can take organization-template or organizations/templates
            json:true
        }
        bp.post(data, function(err,data){
            callback(err,data.body);
        });
    }

    this.get = function(objectType,options,callback){
        var req = {
            qs: options,
            headers: {'Authorization': this.auth},
            url: objectAPIMapping[objectType] || objectType
        }

        if(typeof options === "object"){
            req.qs = options
        } else {
            req.url += '/'+options //append id
        }

        bp.get(req, function(err,data){
            callback(err,data.body);
        });
    }
}

module.exports = Blueprint;