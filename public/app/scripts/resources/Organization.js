angular.module('DEMO_MODULE').factory("Organization", function($resource){
    return $resource("/blueprint/organizations/:id");
});