(function() {
  "use strict";

  angular
    .module("pokeMaster")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function AppRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("login", {
        url: "/",
        templateUrl: "index.html",
        controller: "BattleController",
        controllerAs: "battle"
      })
      .state("game", {
        url: "/game",
        templateUrl: "templates/game.html",
        controller: "BattleController",
        controllerAs: "battle"
      })

    $urlRouterProvider.otherwise("/");
  }

})();