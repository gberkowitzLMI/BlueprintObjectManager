angular.module('DEMO_MODULE').controller('DeviceTypes', function($scope, DeviceType){
    $scope.selectedDeviceType = null;
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
    var loadDeviceTypes = function(page,pageSize){
        $scope.paging.page = page;
        $scope.paging.pageSize = pageSize;
        DeviceType.get({page:$scope.paging.page, pageSize:$scope.paging.pageSize}, function(data){
            $scope.deviceTypes = data.deviceTypes.results;
            $scope.paging = data.deviceTypes.meta;
        });
    }

    $scope.createDeviceType = function(){
        if($scope.newDeviceType && !$scope.newDeviceType.name =='')
            DeviceType.save({name:$scope.newDeviceType.name}, function(data){
                $scope.deviceTypes.push(data.deviceType);
                $scope.addNew = false; 
                $scope.newDeviceType = {};
            });
    }

    $scope.refresh = loadDeviceTypes;
    
    loadDeviceTypes(1,10);
});