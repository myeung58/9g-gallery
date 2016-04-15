var app = angular.module('9g-gallery', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    console.log('reached stateProvider');

    $stateProvider.state('home', {
      url: '/',
      templateUrl: '/partials/home.html',
      controller: 'mainController'
    });

    $urlRouterProvider.otherwise('/');
  }
]);
