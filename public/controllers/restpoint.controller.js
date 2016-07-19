(function() {
  "use strict";

  angular
      .module("pokeMaster")
      .controller("RestpointController", RestpointController);

  PokemartController.$inject = ["RestpointDataService", "$state", "$log", "$http"];

  function RestpointController(TrainerDataService, $state, $log, $http) {
    var rest = this;


})();
