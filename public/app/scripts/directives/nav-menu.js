angular.module('DEMO_MODULE').directive('nav', function(){
    return {
        scope: {
            menuItems: '='
        },
        templateUrl: 'app/scripts/directives/nav-menu.html'
    };
});