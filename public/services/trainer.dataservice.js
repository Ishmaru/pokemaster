(function() {
  "use strict";

  angular
      .module("pokeMaster")
      .factory("TrainerDataService", TrainerDataService);

  TrainerDataService.$inject = ["$state", "$log", "$http"];

  function TrainerDataService($state, $log, $http) {
    var trainer = {};

    trainer.pokemon = [];

    trainer.getPoke = getPoke;

    trainer.faint = faint;

    trainer.swap = swap;

    trainer.index = findex;

    // trainer.getPoke();

    function getPoke() {
      $http.get(`api/users/${_id}/pokemons`).then(function(response) {
        trainer.pokemon = response.data;
      }, function(errRes) {
        console.error('Error', errRes);
      });
    }

    function index(poke) {
      return trainer.pokemon.indexOf(poke);
    }

    function swap(poke) {
      // var change =  trainer.pokemon.shift();
      var change = trainer.pokemon.splice(index(poke), 1);
      trainer.pokemon.push(change);
    }

    function faint() {
      trainer.pokemon[0].currHp = 1;
      swap(trainer.pokemon[0]);
    }

  return trainer;
  }

})();
