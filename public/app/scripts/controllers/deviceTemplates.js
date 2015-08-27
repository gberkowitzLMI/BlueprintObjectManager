angular.module('DEMO_MODULE').controller('deviceTemplates', function($scope, deviceTemplate){
    $scope.menuItems = [
        {
            title: 'Organizations',
            location: '/orgs'
        },
        {
            title: 'Device Types',
            location: '/deviceTemplates'
        }
    ];

    $scope.paging = {};
    var loaddeviceTemplates = function(page,pageSize){
        $scope.paging.page = page;
        $scope.paging.pageSize = pageSize;
        deviceTemplate.get({page:$scope.paging.page, pageSize:$scope.paging.pageSize}, function(data){
            $scope.deviceTemplates = data.deviceTemplates.results;
            $scope.paging = data.deviceTemplates.meta;
        });
    }

    $scope.createdeviceTemplate = function(){
        if($scope.newdeviceTemplate && !$scope.newdeviceTemplate.name =='')
            deviceTemplate.save({name:$scope.newdeviceTemplate.name}, function(data){
                $scope.deviceTemplates.push(data.deviceTemplate);
                $scope.addNew = false; 
                $scope.newdeviceTemplate = {};
            });
    }

    $scope.dtDetails = function(dt){
        $scope.selecteddeviceTemplate = dt;
    }

    $scope.refresh = loaddeviceTemplates;
    
    loaddeviceTemplates(1,10);
});