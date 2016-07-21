(function() {
  "use strict";

  angular
    .module("pokeMaster")
    .controller("LoginController", LoginController);

  LoginController.$inject = ["$state", "UserDataService", "$log", "authService"];

  function LoginController($state, userDataService, $log, authService) {
    var vm = this;

    vm.login      = login;
    vm.isLoggedIn = authService.isLoggedIn;
    vm.currentUser = userDataService.user;

    // Form data for login
    vm.loginData;

    function login() {
      console.log('hey');
      authService.login(vm.loginData.email, vm.loginData.password)
        .then(function(res) {
          $log.log(res.data);
          $state.go('game');
        });
    };

  }

})();
