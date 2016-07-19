(function() {
  "use strict";

  angular
      .module("pokeMaster")
      .factory("WildDataService", WildDataService);

  WildDataService.$inject = ["$state", "$log", "$http"];

  function WildDataService($state, $log, $http) {
    var wild = {};

    wild.wildmon = [];

    wild.getWild = getWild;

    wild.kill = kill;

    wild.getWild();

    function getWild() {
      var pokeId = Math.floor(Math.random() * (649 + 1));
      $http.get(`http://pokeapi.co/api/v2/pokemon/${pokeId}/`).then(function(response) {
        wild.wildmon = response.data;
        wild.wildmon[0].currHp = wild.wildmon[0].stats[5].base_stat;
      }, function(errRes) {
        console.error('Error', errRes);
      });
    }
    function kill() {
      wild.wildmon.shift();
      getWild();
    }
  return wild;
  }

})();
