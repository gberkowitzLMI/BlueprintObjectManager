angular.module('DEMO_MODULE').factory("deviceTemplate", function($resource){
    return $resource("/blueprint/device-templates/:id");
});