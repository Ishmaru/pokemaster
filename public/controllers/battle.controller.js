(function() {
  'use strict';

  angular
      .module("pokeMaster")
      .controller("BattleController", BattleController);

  BattleController.$inject = ["WildDataService", "TrainerDataService", "$state", "$log", "$http", "$timeout"];

  function BattleController(WildDataService, TrainerDataService, $state, $log, $http, $timeout) {
    var battle = this;

    battle.order = [];
    battle.attack = turn;
    battle.capture = capture;
    battle.flee = flee;
    battle.select = TrainerDataService.select;
    battle.update = updatePokemon;
    battle.findStrongestStat = TrainerDataService.findStrongestStat;

    function getPokemon() {
      WildDataService.getWild().then(function(response) {
        battle.currentWild = JSON.parse(response.data.body);
        battle.currentWild.curr_hp = battle.currentWild.stats[5].base_stat;
        TrainerDataService.defeated = 0;
        WildDataService.spawnAnimation(battle.currentWild);
      })
    }
    getPokemon();

    TrainerDataService.getPoke().then(function(response) {
      battle.currentPoke = response.data;
    })

    function kill() {
      if (battle.currentWild.curr_hp <= 1) {
        expReward(battle.currentPoke[0], battle.currentWild);
        battle.currentWild = null;
        getPokemon();
      }
      if (battle.currentPoke[0].curr_hp <= 1) {
        updatePokemon(battle.currentPoke[0]._id, battle.currentPoke[0]);
        TrainerDataService.faint(battle.currentPoke, battle.currentPoke[0]);
      }
    }

    function checkPriority(enemy, player) {
      if (player.stats[0].base_stat >= enemy.stats[0].base_stat) {
        battle.order.push(player);
        battle.order.push(enemy);
      } else {
        battle.order.push(enemy);
        battle.order.push(player);
      }
      // console.log(battle.order);
    }

    function dodgeCalc(attacker, defender = battle.currentPoke[0]) {
      var defLuck = (Math.floor(Math.random() * (defender.stats[0].base_stat)));
      var attLuck = attacker.stats[4].base_stat;
      return (defLuck < attLuck) ? true : false;
    }

    function dammage() {
      if (battle.order.length > 1) {
        if (dodgeCalc(battle.order[0], battle.order[1])) {
          attackCalc(battle.order[0], battle.order[1])
        };
      } else {
        if (dodgeCalc(battle.order[0], battle.currentPoke[0])) {
          attackCalc(battle.order[0], battle.currentPoke[0]);
        };
      }
    }

    function superHit() {
      return Math.floor(Math.random() * 2) + 1;
    }

    function attackCalc(attacker, defender = battle.currentPoke[0]) {
      TrainerDataService.damageAnimation(defender);
      defender.curr_hp -= Math.floor(Math.max(10, ((TrainerDataService.findStrongestStat(attacker.stats[4].base_stat, attacker.stats[2].base_stat) + superHit()) - TrainerDataService.findStrongestStat(attacker.stats[1].base_stat, attacker.stats[3].base_stat))));
      // defender.curr_hp -= parseInt(Math.max(10, ((attacker.stats[4].base_stat + superHit()) - defender.stats[3].base_stat)));
      console.log('hit', defender.name, defender.curr_hp);
      attacker.att = 'bounce animated';
      $timeout(function() {attacker.att = '';}, 800);
    }

    function missedAtt() {
      console.log('missed');
    }

    function missed() {
      console.log('failed');
      battle.currentWild.hurt = '';
      turn(battle.currentWild);
    }

    function turn(enemy, player){
      if (player) {
        checkPriority(enemy, player);
      } else {
        battle.order.push(enemy);
      };
        $timeout(function() {
          TrainerDataService.expGift(battle.currentPoke[0], 15, battle);
          dammage();
          if (checkPoke(battle.order[1])) return false;
          if (!player) return false;
          var change = battle.order.shift();
          battle.order.push(change);
            $timeout(function() {
              dammage();
              checkPoke(battle.order[1]);
              TrainerDataService.restore(battle.currentPoke);
              battle.order = [];
            }, 2000);
        }, 500);
    }

    function checkPoke(pokemon = battle.currentPoke[0]){
      if (pokemon.curr_hp < 1) {
        console.log(`${pokemon.name} has fainted!`);
        kill(pokemon);
        battle.order = [];
        return true;
      }
    }

    function capture(chance, pokemon){
      console.log('Threw Pokeball');
      pokemon.hurt = 'zoomOut slow-animated';
      $timeout(function() {
        (Math.floor(Math.random() * (100 + (pokemon.curr_hp / 2))) < chance) ? postPoke(WildDataService.prepareToSave(pokemon)) : missed()
      }, 2000);
    }

    function expReward(pokeWin, pokeLoose) {
      console.log('winner', pokeWin)
      pokeWin.exp += pokeLoose.base_experience;
      console.log(`you have gained: ${pokeLoose.base_experience}`);
      TrainerDataService.levelUp(pokeWin);
      updatePokemon(battle.currentPoke[0]._id, battle.currentPoke[0]);
    }

    function postPoke(pokemon) {
      $http.post('/api/pokemon', pokemon)
        .then(function(response) {
          expReward(battle.currentPoke[0], battle.currentWild);
          console.log(response);
          battle.currentWild = null;
          getPokemon();
          TrainerDataService.getPoke();
        });
    }

    function flee() {
      battle.currentWild = null;
      console.log("you have fled");
      TrainerDataService.restore(battle.currentPoke);
      getPokemon();
      TrainerDataService.getPoke()
    }

    function updatePokemon(id, pokemon) {
      console.log(id, pokemon);
      $http.put('/api/pokemon/' + id, pokemon).then(function(response) {
      }, function(errRes) {
        console.log('Cannot Put', errRes);
      }).then(TrainerDataService.getPoke());
    }

  }

})();
