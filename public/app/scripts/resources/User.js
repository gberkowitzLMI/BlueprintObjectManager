angular.module('DEMO_MODULE').factory("User", function($resource){
    return $resource("/api/users/:id");
});