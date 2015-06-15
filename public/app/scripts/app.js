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
    'ngResource'
  ])
  .run(function($rootScope, $location, Auth){
    $rootScope.$on('$routeChangeStart', function(e){
      if($location.$$url != '/login' && !Auth.isLoggedIn()){
        console.log("Not logged in");
        e.preventDefault();
        $location.path('/login');
        $location.replace();
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
      .when('/users', {
        templateUrl: '/app/views/users.html',
        controller: 'User'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
