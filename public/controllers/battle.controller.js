(function() {
  "use strict";

  angular
      .module("pokeMaster")
      .controller("BattleController", BattleController);

  BattleController.$inject = ["WildDataService", "TrainerDataService", "$state", "$log", "$http"];

  function BattleController(WildDataService, TrainerDataService, $state, $log, $http) {
    var battle = this;

    battle.order = [];

    WildDataService.getWild().then(function(response) {
      battle.currentWild = JSON.parse(response.data.body);
      battle.currentWild.curr_hp = battle.currentWild.stats[5].base_stat;
    });

    TrainerDataService.getPoke().then(function(response) {
      battle.currentPoke = response.data;
    });

    battle.kill = WildDataService.kill;


    function attackCalc() {
      battle.order[1].currHp -= Math.max(1, (Math.floor(Math.random() * (battle.order[0].stats[4].base_stat + 1)) - battle.order[1].stat[3].base_stat));
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
    };

    function turn(){
      checkPriority(battle.currentPoke, battle.currentWild);
      for (var i = 0; i < 1; i++) {
        battle.dammage();
        var change = battle.order.shift();
        battle.order.push(change);
      }
      battle.order = [];
    };


    function checkPoke(){
      if (battle.order[1].currHp < 1) {
        battle.expReward();
        console.log(`${battle.currentPoke.name} has fainted!`);
      }
    }

    function capture(chance){
      (Math.floor(Math.random() * (100 + (battle.order[1].currHp / 2))) < chance) ? battle.postPoke() : console.log("Failed")
    }

    function expReward() {
      battle.order[0].exp += battle.order[1].base_experience;
    }

    function postPoke() {
      $http.post('/api/pokemon', battle.currentWild)
        .then(function(response) {
          console.log(response);
          battle.kill;
        });
    }
  }

})();




    // setTimeout(function(){ $log.warn(TrainerDataService.pokemon) }, 5000);

    // function checkWild(){
    //   if (battle.currentWild.stats[5].base_stat < 1) {
    //     console.log(`${battle.currentWild.name} has fainted!`);
    //   }
    // }

    // function checkPoke(){
    //   if (battle.currentPoke.currHp < 1) {
    //     console.log(`${battle.currentPoke.name} has fainted!`);
    //   }
    // }

    // battle.currentWild = WildDataService.wildmon;
    // battle.pokemons = TrainerDataService.pokemon;
    // battle.currentPoke = TrainerDataService.pokemon[0];
    // battle.expReward = expReward;
    // battle.capture = capture;
    // battle.attackCalc = attackCalc;
    // // battle.dodgeCalc = dodgeCalc;
    // battle.checkPriority = checkPriority;
    // battle.dammage = missed;
    // battle.missed = missed;
    // battle.turn = turn;
    // battle.test = test;
    // $log.warn(TrainerDataService.pokemon);
    // function attackCalc(player, enemy) {
    //   return Math.max(1, (Math.floor(Math.random() * (player.stats[4].base_stat + 1)) - enemy.stat[3].base_stat));
    // };

    // function dodgeCalc(player, enemy) {
    //   return ((Math.floor(Math.random() * (enemy.stats[0].base_stat + 1) > (player.stats[4].base_stat + 1)))) ? true : false;
    // };

    // function attackCalc() {
    //   battle.order[1].stats[5].base_stat -= Math.max(1, (Math.floor(Math.random() * (battle.order[0].stats[4].base_stat + 1)) - battle.order[1].stat[3].base_stat));
    // };

    // function test() {
    //   battle.currentWild = "WildDataService.wildmon";
    //   battle.pokemons = "TrainerDataService.pokemon";
    //   console.log(battle.pokemons);
    // }
