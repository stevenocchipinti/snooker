'use strict';

angular.module('app')
  .factory('Game', function () {

    var loadedGame = JSON.parse(localStorage.getItem('snookerGame'));
    var game = {
      players: loadedGame ? loadedGame.players : [],
      currentPlayerId: loadedGame ? loadedGame.currentPlayerId : 0,

      addPlayer: function(name, target) {
        this.players.push({name: name, target: target, score: 0});
        this.persist();
      },

      removePlayer: function(idx) {
        this.players.splice(idx, 1);
        this.persist();
      },

      setCurrentPlayerId: function(playerId) {
        this.currentPlayerId = playerId;
        this.persist();
      },

      getNextPlayerId: function() {
        var nextPlayerId = this.currentPlayerId + 1;
        return (nextPlayerId < this.players.length) ? nextPlayerId : 0;
      },

      shufflePlayers: function() {
        for (var i = this.players.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = this.players[i];
          this.players[i] = this.players[j];
          this.players[j] = temp;
        }
        this.persist();
      },

      incrementTarget: function(playerId) {
        this.players[playerId].target += 10;
        this.persist();
      },

      // TODO: These could probably be on the player object?
      canon:  function(idx) { this.addScoreToPlayer(2, idx); },
      yellow: function(idx) { this.addScoreToPlayer(2, idx); },
      green:  function(idx) { this.addScoreToPlayer(3, idx); },
      blue:   function(idx) { this.addScoreToPlayer(5, idx); },
      pink:   function(idx) { this.addScoreToPlayer(6, idx); },
      black:  function(idx) { this.addScoreToPlayer(7, idx); },
      brown:  function(idx) { this.resetPlayerScore(idx); },
      foul:   function(idx) { this.resetPlayerScore(idx); },

      addScoreToPlayer: function(points, playerId) {
        this.players[playerId].score += points;
        if (this.players[playerId].score > this.players[playerId].target) {
          this.resetPlayerScore(playerId);
        }
        this.persist();
      },

      resetPlayerScore: function(playerId) {
        this.players[playerId].score = 0;
        this.persist();
      },

      reset: function() {
        this.currentPlayerId = 0;
        angular.forEach(this.players, function(player) {
          player.score = 0;
        });
      },

      persist: function() {
        localStorage.setItem('snookerGame', angular.toJson({
          updatedAt: new Date().getTime(),
          players: this.players,
          currentPlayerId: this.currentPlayerId,
        }));
      }
    };

    return game;
  });