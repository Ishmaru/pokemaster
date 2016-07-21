(function() {
  "use strict";

  angular
      .module("pokeMaster")
      .factory("TrainerDataService", TrainerDataService);

  TrainerDataService.$inject = ["$state", "$log", "$http"];

  function TrainerDataService($state, $log, $http) {
    return {
      // var trainer = this;
      // pokemon: [],

      getPoke: function() {
        var user = '578e805bac9ab9181610f28d';
        // var user = '578e805bac9ab9181610f28c';
        return $http.get(`api/pokemon/${user}`);
      },

      faint: function(arr, poke) {
        poke.curr_hp = 1;
        var change = arr.splice(arr.indexOf(poke), 1);
        arr.push(change[0]);
      },

      select: function(arr, poke) {
        var change = arr.splice(arr.indexOf(poke), 1);
        arr.unshift(change[0]);
      },

      levelUp: function(pokemon) {
        if (pokemon.exp >= pokemon.next_lv) {
          pokemon.level += 1;
          pokemon.exp -= pokemon.next_lv;
          pokemon.next_lv *= 1.5;
          pokemon.stats.forEach(function(i){
            i.base_stat *= (0.40 * pokemon.level);
            console.log(i.base_stat);
          });
          pokemon.curr_hp = pokemon.stats[5].base_stat;
        }
      }
    }
  }

})();

