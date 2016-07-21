(function() {
  "use strict";

  angular
      .module("pokeMaster")
      .factory("UserDataService", UserDataService);

  UserDataService.$inject = ["$state", "$log", "$http"];

  function UserDataService($state, $log, $http) {
    var user = {};

    return user;
  }

})();
