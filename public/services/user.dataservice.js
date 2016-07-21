(function() {
  "use strict";

  angular
      .module("pokeMaster")
      .factory("UserDataService", UserDataService);

  UserDataService.$inject = ["$state", "$log", "$http"];

  function UserDataService($state, $log, $http) {
    var userFactory = {
      user: {}
    };

    return userFactory;
  }

})();
