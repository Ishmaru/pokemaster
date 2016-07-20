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
    battle.capture = capture;
    battle.flee = flee;


    function getPokemon() {
      WildDataService.getWild().then(function(response) {
        battle.currentWild = JSON.parse(response.data.body);
        battle.currentWild.curr_hp = battle.currentWild.stats[5].base_stat;
      });
    }
    getPokemon();

    TrainerDataService.getPoke().then(function(response) {
      battle.currentPoke = response.data;
    });

    function kill() {
      expReward(battle.currentPoke, battle.currentWild);
      if (battle.currentWild.curr_hp <= 1) {
        battle.currentWild = null;
        getPokemon();
      }
    };

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

    function dammage() {
      if (dodgeCalc(battle.order[0], battle.order[1])) attackCalc(battle.order[0], battle.order[1]);
    };

    function superHit() {
      return Math.floor(Math.random() * 2) + 1;
    };

    function attackCalc(attacker, defender) {
      defender.curr_hp -= Math.max(2, ((attacker.stats[4].base_stat + superHit()) - defender.stats[3].base_stat));
      console.log('hit', defender.name, defender.curr_hp);
      // battle.order[1].currHp -= Math.max(1, (Math.floor(Math.random() * battle.order[0].stats[4].base_stat) - battle.order[1].stat[3].base_stat));
    };

    function missed() {
      console.log('missed');
    }

    function turn(){
      checkPriority(battle.currentPoke[0], battle.currentWild);
      for (var i = 0; i < 2; i++) {
        dammage();
        checkPoke(battle.order[1]);
        var change = battle.order.shift();
        battle.order.push(change);
      }
      battle.order = [];
    };


    function checkPoke(pokemon){
      if (pokemon.curr_hp < 1) {
        console.log(`${pokemon.name} has fainted!`);
        kill(pokemon);
      }
    }

    function capture(chance, pokemon){
      (Math.floor(Math.random() * (100 + (pokemon.curr_hp / 2))) < chance) ? postPoke(WildDataService.prepareToSave(pokemon)) : console.log("Failed")
    }

    function expReward(pokeWin, pokeLoose) {
      console.log("pokeLoose", pokeLoose);
      console.log("pokeWin", pokeWin);
      pokeWin.exp += pokeLoose.base_experience;
      console.log(`you have gained: ${pokeLoose.base_experience}`);
      // battle.order[0].exp += battle.order[1].base_experience;
    }

    function postPoke(pokemon) {
      $http.post('/api/pokemon', pokemon)
        .then(function(response) {
          console.log(response);
          kill(pokemon);
        });
    }

    function flee() {
      battle.currentWild = null;
      console.log("you have fled");
      getPokemon();
    }
    // function nextPoke() {
    //   if (battle.currentPoke.curr_hp <= 1){
    //     // end game
    //   } else if {

    //   }
    // }
  }


})();
