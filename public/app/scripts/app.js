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
  .run(function($rootScope, $location, $http, Auth){
    $rootScope.$on('$routeChangeStart', function(e){
      if($location.$$url != '/login' && !Auth.isLoggedIn()){
        console.log("Not logged in");
        e.preventDefault();
        $location.path('/login');
        $location.replace();
      } else {
        $http.defaults.headers.common.Authorization = window.localStorage["authorization"];
        $http.defaults.headers.common.AccountId = window.localStorage["accountId"]
      }
    });
  })
  .config(function ($routeProvider) {
    $routeProvider 
      .when('/orgs', {
        templateUrl: '/app/views/orgs.html',
        controller: 'Orgs'
      })
      .when('/devicetypes', {
        templateUrl: '/app/views/deviceTypes.html',
        controller: 'DeviceTypes'
      })
      .when('/login', {
        templateUrl: '/app/views/login.html',
        controller: 'Login'
      })

      .otherwise({
        redirectTo: '/orgs'
      });
  });
