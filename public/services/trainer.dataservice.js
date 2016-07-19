(function() {
  "use strict";

  angular
      .module("pokeMaster")
      .factory("TrainerDataService", TrainerDataService);

  TrainerDataService.$inject = ["$state", "$log", "$http"];

  function TrainerDataService($state, $log, $http) {
    var trainer = {};

    trainer.pokemon = [];

    trainer.getPoke = getPoke;

    // trainer.getPoke();

    function getPoke() {
      $http.get(`api/users/${_id}/pokemons`).then(function(response) {
        trainer.pokemon = response.data;
      }, function(errRes) {
        console.error('Error', errRes);
      });
    }
  return trainer;
  }

})();
