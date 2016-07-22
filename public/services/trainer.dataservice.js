(function() {
  "use strict";

  angular
      .module("pokeMaster")
      .factory("TrainerDataService", TrainerDataService);

  TrainerDataService.$inject = ["$state", "$log", "$http", "UserDataService"];

  function TrainerDataService($state, $log, $http, UserDataService) {
    return {
      // var trainer = this;
      defeated: 0,

      getPoke: function() {
        // var user = '578e805bac9ab9181610f28d';
        // var user = '578e805bac9ab9181610f28c';
        var user = UserDataService.user._id;
        return $http.get(`api/pokemon/${user}`);
      },

      faint: function(arr, poke) {
        poke.curr_hp = 1;
        this.checkFail(arr);
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
      },

      restore: function(arr) {
        arr.forEach(function(i){
          if (i > 0) {
            if (i.curr_hp < i.stats[5].base_stat) {
              i.curr_hp += 5;
            };
            if (i.curr_hp > i.stats[5].base_stat) {
              i.curr_hp = i.stats[5].base_stat;
            };
          }
        });
      },

      checkFail: function(arr) {
        this.defeated ++;
        if (arr.length <= this.defeated) {
          console.log('defeated');
          this.gameOver();
        }
      },

      gameOver: function() {
        $state.go('gameover')
      }

    }
  }

})();

