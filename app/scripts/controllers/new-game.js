'use strict';

angular.module('app')
  .controller('NewGameCtrl', function ($scope, Game) {
    $scope.players = Game.players;
    $scope.playerName = '';
    $scope.targetScore = Game.DEFAULT_TARGET;


    $scope.addPlayer = function() {
      Game.addPlayer($scope.playerName, $scope.targetScore);
      $scope.playerName = '';
      $scope.targetScore = Game.DEFAULT_TARGET;
    };

    $scope.removePlayer = function(idx) {
      Game.removePlayer(idx);
    };

    $scope.editPlayer = function(idx) {
      var player = Game.removePlayer(idx);
      $scope.playerName = player.name;
      $scope.targetScore = player.target;
    };

    $scope.shufflePlayers = function() {
      Game.shufflePlayers();
    };

    $scope.resetScores = function() {
      Game.resetScores();
    };

    $scope.resetTargets = function() {
      Game.resetTargets();
    };
  });
