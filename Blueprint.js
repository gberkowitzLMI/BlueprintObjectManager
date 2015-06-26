//Duplicated logic from blueprint.js, but attempting to separate business logic from api routing logic

var manage = require('request').defaults({baseUrl: "https://blueprint.xively.com:443/api/manage/"});

var createOrg = function(options, callback){
    manage.post(_.extend(options, {url: 'organizations', json:true}), function(err,data){
        callback(err,data);
    })
}

module.exports = {
    organization: {
        create: createOrg
    }
}