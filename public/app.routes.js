(function() {
  "use strict";

  angular
    .module("pokeMaster")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function AppRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("splash", {
        url: "/",
        templateUrl: "templates/splash.html"
        // controller: "BattleController",
        // controllerAs: "battle"
      })
      .state("game", {
        url: "/game",
        templateUrl: "templates/game.html",
        controller: "BattleController",
        controllerAs: "battle"
      })
      .state("login", {
        url: "/login",
        templateUrl: "/templates/login.html",
        controller: "LoginController",
        controllerAs: "vm"
      })
    $urlRouterProvider.otherwise("/");
  }

})();
