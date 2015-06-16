angular.module('DEMO_MODULE').controller('Main', function($scope, Organization){
    Organization.query({},function(data){
        $scope.organizations = data;
    });
});