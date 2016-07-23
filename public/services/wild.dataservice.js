(function() {
  'use strict';

  angular
      .module('pokeMaster')
      .factory('WildDataService', WildDataService);

  WildDataService.$inject = ['$state', '$log', '$http', "UserDataService", "$timeout"];

  function WildDataService($state, $log, $http, UserDataService, $timeout) {
    // var wild = this;
    return {

      getWild: function() {
        return $http.get('api/pokemon/get');
      },

      addStats: function() {
        this.wildmon[0].stats.forEach(function(i){
          i.base_stat *= (0.25 * this.wildmon[0].level);
        });
        this.wildmon[0].currHp = wildmon[0].stats[5].base_stat;
      },

      prepareToSave: function(input) {
        var trimmed = {
          name: input.name,
          stats: [
            {
              stat: {
                name: input.stats[0].name
              },
              base_stat: input.stats[0].base_stat
            },
            {
              stat: {
                name: input.stats[1].name
              },
              base_stat: input.stats[1].base_stat
            },
            {
              stat: {
                name: input.stats[2].name
              },
              base_stat: input.stats[2].base_stat
            },
            {
              stat: {
                name: input.stats[3].name
              },
              base_stat: input.stats[3].base_stat
            },
            {
              stat: {
                name: input.stats[4].name
              },
              base_stat: input.stats[4].base_stat
            },
            {
              stat: {
                name: input.stats[5].name
              },
              base_stat: input.stats[5].base_stat
            }
          ],
          sprites: {
            back_default: input.sprites.back_default,
            front_default: input.sprites.front_default
          },
          base_experience: input.base_experience,
          types: [
            {
              classtype: {
                name: input.types[0].name
              },
              classtype: {
                name: input.types[0].name
              }
            }
          ],

          user:    UserDataService.user._id,
          curr_hp: input.curr_hp
        }
        return trimmed;
      },

      spawnAnimation: function(poke) {
        poke.hurt = 'lightSpeedIn animated';
        $timeout(function(){ poke.hurt = ''; }, 1000)
      }
    }
  }

})();
