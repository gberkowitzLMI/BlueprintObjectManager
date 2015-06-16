angular.module('DEMO_MODULE').controller('Login', function($scope, $rootScope, $location, Auth){

    $scope.login = function(authorization){
        console.log(authorization);
        Auth.doLogin(authorization)
            .then(function(){
                window.localStorage["authorization"] = authorization;
                window.localStorage["accountId"] = $scope.acct;
                //Make all subsequent calls with acct and auth
                $location.path('/')
            }, function(err){
                console.log(err);
            });
    }
});