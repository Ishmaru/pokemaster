(function() {
  "use strict";

  angular
      .module("pokeMaster")
      .controller("PokemartController", PokemartController);

  PokemartController.$inject = ["TrainerDataService", "$state", "$log", "$http"];

  function PokemartController(TrainerDataService, $state, $log, $http) {
    var shop = this;

  }
})();
