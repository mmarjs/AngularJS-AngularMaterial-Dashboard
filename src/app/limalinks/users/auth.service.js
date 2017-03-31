(function() {
    'use strict';

    angular
        .module('app.limalinks.users')
        .service('AuthService', AuthService);

    /* @ngInject */
    function AuthService($q, $http, SessionService, limalinksSettings, RoleStore, $cookies){
        //get base URL from settings
        var baseURL = limalinksSettings.API;
        var currentUser = SessionService.getUser();
        /**
        * Check whether the user is logged in
        * @returns boolean
        */
        this.isLoggedIn = function isLoggedIn(){
          return SessionService.getUser() !== null;
        };

        /**
        * Log in
        *
        * @param credentials
        * @returns {*|Promise}
        */
        this.logIn = function(credentials, callback){
          $http
            .get(baseURL + '/v3/auth/login?username='+credentials.username+'&password='+credentials.password)
            .then(function(response){
              var headers = response.headers;
              var user = response.data;

              if(user.messages.success==null){
                console.log($cookies.csrftoken);
                callback(false);
              }
              else {
                var user = user.data;
                user.displayName = user.first_name + " " + user.last_name;
                user.avatar = 'assets/images/avatars/avatar-5.png',
                SessionService.setUser(user);
                SessionService.setAccessToken("Basic " + btoa(credentials.username + ":" + credentials.password));
                SessionService.getAccessToken();
                callback(true);

              }


            });
        };

        /**
        * Log out
        *
        * @returns {*|Promise}
        */
        this.logOut = function(){
          return $http
            .get(baseURL + '/v3/auth/logout')
            .then(function(response){

              // Destroy SessionService in the browser
              SessionService.destroy();
            });

        };

        this.hasPermission = function(permission) {
            var deferred = $q.defer();
            var hasPermission = false;

            // check if user has permission via its roles
            angular.forEach(currentUser.roles, function(role) {
                // check role exists
                if(RoleStore.hasRoleDefinition(role)) {
                    // get the role
                    var roles = RoleStore.getStore();

                    if(angular.isDefined(roles[role])) {
                        // check if the permission we are validating is in this role's permissions
                        if(-1 !== roles[role].validationFunction.indexOf(permission)) {
                            hasPermission = true;
                        }
                    }
                }
            });

            // if we have permission resolve otherwise reject the promise
            if(hasPermission) {
                deferred.resolve();
            }
            else {
                deferred.reject();
            }

            // return promise
            return deferred.promise;
        }

        this.getUsers = function() {
            return $http.get('app/permission/data/users.json');
        }

  }

})();
