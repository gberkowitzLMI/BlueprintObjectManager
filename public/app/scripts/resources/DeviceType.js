angular.module('DEMO_MODULE').factory("DeviceType", function($resource){
    return $resource("/blueprint/device-types/:id");
});