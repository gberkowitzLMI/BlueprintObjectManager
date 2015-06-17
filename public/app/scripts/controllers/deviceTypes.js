angular.module('DEMO_MODULE').controller('DeviceTypes', function($scope, DeviceType){
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

    $scope.refresh = loadDeviceTypes;
    
    loadDeviceTypes(1,10);
});