'use strict';

angular
  .module('app', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/rules', {
        templateUrl: 'views/rules.html'
      })
      .when('/new', {
        templateUrl: 'views/new-game.html',
        controller: 'NewGameCtrl'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl'
      })
      .when('/game/score/:playerId', {
        templateUrl: 'views/score.html',
        controller: 'ScoreCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
