angular.module('DEMO_MODULE').directive('nav', function($location){
    var link = function(scope, element, attrs){
        scope.logOut = function(){
            delete window.localStorage["authorization"];
            delete window.localStorage["accountId"];
            $location.path('/login');
        }
    };

    return {
        scope: {
            menuItems: '='
        },
        templateUrl: 'app/scripts/directives/nav-menu.html',
        link : link
    };
});