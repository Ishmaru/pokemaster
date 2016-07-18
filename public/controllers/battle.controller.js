(function() {
  "use strict";

  angular
      .module("pokeMaster")
      .factory("BattleController", BattleController);

  BattleController.$inject = ["WildDataService", "TrainerDataService", "$state", "$log", "$http"];

  function BattleController(WildDataService, TrainerDataService, $state, $log, $http) {
    var battle = this;

    battle.order;
    battle.currentPoke = TrainerDataService.pokemon[0];
    battle.currentWild = WildDataService.wild[0];

    battle.attackCalc = attackCalc;
    battle.dodgeCalc = dodge;
    battle.checkPriority = checkSpeed;


    function attackCalc(player, enemy) {
      return Math.max(1, (Math.floor(Math.random() * (player.stats[4].base_stat + 1)) - enemy.stat[3].base_stat));
    };

    function dodgeCalc(player, enemy) {
      return ((Math.floor(Math.random() * (enemy.stats[0].base_stat + 1) > (player.stats[4].base_stat + 1)))) ? true : false;
    };

    function checkPriority(player, enemy) {
       (player.stats[0].base_stat >= enemy.stats[0].base_stat) ? player : enemy;
    };

    function Turn(){

    };

  }

})();
