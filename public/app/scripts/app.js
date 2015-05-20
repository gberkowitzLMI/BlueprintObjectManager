'use strict';

/**
 * @ngdoc overview
 * @name jeopardyApp
 * @description
 * # jeopardyApp
 *
 * Main module of the application.
 */
angular
  .module('DEMO_MODULE', [
    'ngRoute',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/app/views/main.html',
        controller: 'Main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
