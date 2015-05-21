'use strict';

/**
 * @ngdoc overview
 * @name XivelyDemo
 * @description
 * # XivelyDemo
 *
 * Main module of the application.
 */
angular
  .module('DEMO_MODULE', [
    'ngRoute',
    'ngTouch'
  ])
  .run(function($rootScope, $location, Auth){
    $rootScope.$on('$routeChangeStart', function(e){
      if($location.$$url != '/' && !Auth.isLoggedIn()){
        console.log("Not logged in");
        e.preventDefault();
        $location.path('/');
      }
    });
  })
  .config(function ($routeProvider) {
    $routeProvider 
      .when('/', {
        templateUrl: '/app/views/main.html',
        controller: 'Main'
      })
      .when('/login', {
        templateUrl: '/app/views/login.html',
        controller: 'Login'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
