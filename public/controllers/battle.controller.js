(function() {
  "use strict";

  angular
      .module("pokeMaster")
      .controller("BattleController", BattleController);

  BattleController.$inject = ["WildDataService", "TrainerDataService", "$state", "$log", "$http"];

  function BattleController(WildDataService, TrainerDataService, $state, $log, $http) {
    var battle = this;

    battle.order = [];
    battle.attack = turn;

    function getPokemon() {
      WildDataService.getWild().then(function(response) {
        battle.currentWild = JSON.parse(response.data.body);
        battle.currentWild.curr_hp = battle.currentWild.stats[5].base_stat;
      });
    }
    // getPokemon();

    TrainerDataService.getPoke().then(function(response) {
      battle.currentPoke = response.data;
    });

    function kill() {
      expReward(battle.order[0], battle.order[1]);
      getPokemon();
    };

    function attackCalc() {
      battle.order[1].currHp -= Math.max(1, (Math.floor(Math.random() * (battle.order[0].stats[4].base_stat + 1)) - battle.order[1].stat[3].base_stat));
    };

    function missed() {
      console.log('missed');
    }
    function checkPriority(player, enemy) {
      // return (player.stats[0].base_stat >= enemy.stats[0].base_stat) ? player : enemy;
      if (player.stats[0].base_stat >= enemy.stats[0].base_stat) {
        console.log(player.stats[0].base_stat);
        console.log(enemy.stats[0].base_stat);
        battle.order.push(player);
        battle.order.push(enemy);
      } else {
        console.log(player.stats[0].base_stat);
        console.log(enemy.stats[0].base_stat);
        battle.order.push(enemy);
        battle.order.push(player);
      }

      console.log(battle.order);
    };

    function dodgeCalc(attacker, defender) {
      var defLuck = (Math.floor(Math.random() * (defender.stats[0].base_stat)));
      var attLuck = attacker.stats[4].base_stat;
      console.log(defLuck);
      console.log(attLuck);
      return (defLuck < attLuck) ? true : false;
    };

    function attackCalc(attacker, defender) {
      defender.curr_hp -= Math.max(1, (Math.floor(Math.random() * (attacker.stats[4].base_stat + 1)) - attacker.stats[3].base_stat));
      console.log('hit', defender.name, defender.curr_hp);
    };

    function dammage() {
      if (dodgeCalc(battle.order[0], battle.order[1])) attackCalc(battle.order[0], battle.order[1]);
    };

    function turn(){
      checkPriority(battle.currentPoke[0], battle.currentWild);
      for (var i = 0; i < 2; i++) {
        dammage();
        var change = battle.order.shift();
        battle.order.push(change);
        checkPoke(battle.order[1]);
      }
      battle.order = [];
    };


    function checkPoke(pokemon){
      if (pokemon.curr_hp < 1) {
        console.log(`${pokemon.name} has fainted!`);
        kill(pokemon);
      }
    }

    function capture(chance){
      (Math.floor(Math.random() * (100 + (battle.order[1].currHp / 2))) < chance) ? battle.postPoke() : console.log("Failed")
    }

    function expReward(pokeWin, pokeLoose) {
      pokeWin.exp += pokeLoose.base_experience;
      console.log(pokeloose.base_experience);
      // battle.order[0].exp += battle.order[1].base_experience;
    }

    function postPoke(pokemon) {
      $http.post('/api/pokemon', pokemon)
        .then(function(response) {
          console.log(response);
          kill(pokemon);
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


    // function test() {
    //   battle.currentWild = "WildDataService.wildmon";
    //   battle.pokemons = "TrainerDataService.pokemon";
    //   console.log(battle.pokemons);
    // }
