(function() {
  'use strict';

  angular
      .module('pokeMaster')
      .factory('WildDataService', WildDataService);

  WildDataService.$inject = ['$state', '$log', '$http'];

  function WildDataService($state, $log, $http) {
    return {
      wildmon: [],

      getWild: function() {
        return $http.get('api/pokemon/get');
      },

      kill: function() {
        this.wildmon.shift();
        this.getWild();
      },

      addStats: function() {
        this.wildmon[0].stats.forEach(function(i){
          i.base_stat *= (0.25 * this.wildmon[0].level);
        });
        this.wildmon[0].currHp = wildmon[0].stats[5].base_stat;
      }
    }
  }

})();
