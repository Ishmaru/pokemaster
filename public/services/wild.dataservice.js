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

    wild.getWild();

    function getWild() {
      var pokeId = Math.floor(Math.random() * (649 + 1));
      $http.get(`http://pokeapi.co/api/v2/pokemon/${pokeId}/`).then(function(response) {
        wild.wildmon = response.data;
      }, function(errRes) {
        console.error('Error', errRes);
      });
    }
  return wild;
  }

})();
