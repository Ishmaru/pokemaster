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
      .state("register", {
        url: "/register",
        templateUrl: "/templates/register.html",
        controller: "UserController",
        controllerAs: "vm"
      })
      .state("gameover", {
        url: "/gameover",
        templateUrl: "/templates/gameover.html"
      })
    $urlRouterProvider.otherwise("/");
  }

})();
