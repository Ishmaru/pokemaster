(function() {
  "use strict";

  angular
      .module("pokeMaster")
      .factory("WildDataService", WildDataService);

  WildDataService.$inject = ["$state", "$log", "$http"];

  function WildDataService($state, $log, $http) {
    var wild = this;

    wild.wild;

    wild.getWild = getWild;

    wild.getWild();

    function getWild() {
      var pokeId = Math.floor(Math.random() * (649 + 1));
      $http.get(`http://pokeapi.co/api/v2/pokemon/${pokeId}/`).then(function(response) {
        wild.wild = response.data;
      }, function(errRes) {
        console.error('Error', errRes);
      });
    }

  }

})();
