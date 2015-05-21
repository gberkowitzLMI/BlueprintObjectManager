angular.module('DEMO_MODULE').controller('Login', function($scope, $rootScope, $location, Auth){
    $scope.username = "";
    $scope.password = "";

    $scope.login = function(name,pass){
        Auth.doLogin(name,pass)
            .then(function(user){
                window.localStorage["auth_token"] = user.token;
                $rootScope.user = user;
                $location.path('/')
            }, function(err){
                console.log(err);
            });
    }
});