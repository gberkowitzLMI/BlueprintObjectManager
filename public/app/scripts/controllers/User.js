angular.module('DEMO_MODULE').controller('User', function($scope, User){
    $scope.menuItems = [
        {
            title:"Login",
            location: "/login"
        },
        {
            title:"Users",
            location: "/users"
        }
    ];

    User.query(function(data){
        $scope.users = data;
        $scope.currentUser = data[0];
    });
});