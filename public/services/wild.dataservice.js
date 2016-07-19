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

    // wild.addStats()

    // function getWild() {
    //   var pokeId = Math.floor(Math.random() * (649 + 1));
    //   $http.get(`http://pokeapi.co/api/v2/pokemon/${pokeId}/`).then(function(response) {
    //     console.log(response.data);
    //     wild.wildmon = response.data;
    //   }, function(errRes) {
    //     console.error('Error', errRes);
    //   });
    // }

    function getWild() {
      $http.get("api/pokemon/get").then(function(response) {
        console.log(response.data.body);
        wild.wildmon = JSON.parse(response.data.body);
        console.log(wild.wildmon);
      }, function(errRes) {
        console.error('Error', errRes);
      });
    }

    function addStats() {
      wild.wildmon[0].stats.forEach(function(i){
        i.base_stat *= (0.25 * wild.wildmon[0].level);
      });
      wild.wildmon[0].currHp = wild.wildmon[0].stats[5].base_stat;
    }
      // wild.wildmon[0].stats[0].base_stat * (0.25 * wild.wildmon[0].level);
      // wild.wildmon[0].stats[3].base_stat * (0.25 * wild.wildmon[0].level);
      // wild.wildmon[0].stats[4].base_stat * (0.25 * wild.wildmon[0].level);
      // wild.wildmon[0].stats[5].base_stat * (0.25 * wild.wildmon[0].level);

    function kill() {
      wild.wildmon.shift();
      getWild();
    }

  return wild;
  }

})();
