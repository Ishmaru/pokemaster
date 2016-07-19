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

    trainer.index = index;

    trainer.levelUp = levelUp;


    trainer.getPoke();

    function getPoke() {
      var user = '578e805bac9ab9181610f28c';
      $http.get(`api/pokemon/${user}`).then(function(response) {
        console.log(response.data);
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

    function levelUp() {
      if (trainer.pokemon[0].exp >= trainer.pokemon[0].next_lv) {
        trainer.pokemon[0].level += 1;
        trainer.pokemon[0].exp -= trainer.pokemon[0].next_lv;
        trainer.pokemon[0].next_lv *= 1.5;
      }
    }

    function addStats() {
      trainer.pokemon[0].stats.forEach(function(i){
        i.base_stat *= (0.40 * trainer.pokemon.level);
      });
      trainer.pokemon[0].currHp = trainer.pokemon[0].stats[5].base_stat;
    }
  return trainer;
  }

})();
