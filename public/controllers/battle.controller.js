(function() {
  "use strict";

  angular
      .module("pokeMaster")
      .controller("BattleController", BattleController);

  BattleController.$inject = ["WildDataService", "TrainerDataService", "$state", "$log", "$http"];

  function BattleController(WildDataService, TrainerDataService, $state, $log, $http) {
    var battle = this;

    battle.order = [];
    battle.currentWild = WildDataService.wildmon[0];
    battle.currentPoke = TrainerDataService.pokemon[0];

    battle.attackCalc = attackCalc;
    battle.dodgeCalc = dodgeCalc;
    battle.checkPriority = checkPriority;
    battle.dammage = missed;
    battle.missed = missed;
    battle.turn = turn;

    // function attackCalc(player, enemy) {
    //   return Math.max(1, (Math.floor(Math.random() * (player.stats[4].base_stat + 1)) - enemy.stat[3].base_stat));
    // };

    // function dodgeCalc(player, enemy) {
    //   return ((Math.floor(Math.random() * (enemy.stats[0].base_stat + 1) > (player.stats[4].base_stat + 1)))) ? true : false;
    // };

    function attackCalc() {
      battle.order[1].stats[5] -= Math.max(1, (Math.floor(Math.random() * (battle.order[0].stats[4].base_stat + 1)) - battle.order[1].stat[3].base_stat));
    };

    function dodgeCalc() {
      return ((Math.floor(Math.random() * (battle.order[1].stats[0].base_stat + 1) > (battle.order[0].stats[4].base_stat + 1)))) ? true : false;
    };

    function missed() {
      console.log('missed');
    }
    function checkPriority(player, enemy) {
      // return (player.stats[0].base_stat >= enemy.stats[0].base_stat) ? player : enemy;
      if (player.stats[0].base_stat >= enemy.stats[0].base_stat) {
        battle.order.push(player);
        battle.order.push(enemy);
      } else {
        battle.order.push(enemy);
        battle.order.push(player);
      }
    };

    function dammage() {
      dodgeCalc() ? attackCalc() : missed();
    }

    function turn(){
      checkPriority(battle.currentPoke, battle.currentWild);
      for (var i = 0; i < 1; i++) {
        battle.dammage();
        var change = battle.order.shift();
        battle.order.push(change);
      }
      battle.order = [];
    };

  }

})();
