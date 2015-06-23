angular.module('DEMO_MODULE').controller('Orgs', function($scope, Organization){
    $scope.menuItems = [
        {
            title: 'Organizations',
            location: '/orgs'
        },
        {
            title: 'Device Types',
            location: '/devicetypes'
        }
    ];

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

    $scope.createOrg = function(){
        if($scope.newOrg && !$scope.newOrg.name =='')
            Organization.save({name:$scope.newOrg.name}, function(data){
                $scope.organizations.push(data.organization);
                $scope.addNew = false;
                $scope.newOrg = {};
            });
    }
    
    loadOrgs(1,10);
});