angular.module('DEMO_MODULE').controller('Main', function($scope, Organization){
    var loadOrgs = function(page,pageSize){
        $scope.page = page;
        $scope.pageSize = pageSize;
        Organization.get({}, function(data){
            $scope.organizations = data.organizations.results;
            $scope.paging = data.organizations.meta;
        });
    }

    $scope.refresh = loadOrgs;
    
    loadOrgs(1,10);
});