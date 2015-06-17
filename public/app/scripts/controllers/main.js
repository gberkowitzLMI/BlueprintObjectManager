angular.module('DEMO_MODULE').controller('Main', function($scope, Organization){
    $scope.paging = {};
    
    var loadOrgs = function(page,pageSize){
        $scope.paging.page = page;
        $scope.paging.pageSize = pageSize;
        Organization.get({page:$scope.paging.page, pageSize:$scope.paging.pageSize}, function(data){
            $scope.organizations = data.organizations.results;
            $scope.paging = data.organizations.meta;
        });
    }

    $scope.refresh = loadOrgs;
    
    loadOrgs(1,10);
});