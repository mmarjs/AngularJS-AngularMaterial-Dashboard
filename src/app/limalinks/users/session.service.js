(function() {
    'use strict';

    angular
        .module('app.limalinks.users')
        .service('SessionService', SessionService);

    /* @ngInject */
    function SessionService($log, localStorage){

        // Instantiate data when service
        // is loaded
        this._user = localStorage.getItem('SessionService.user');
        this._accessToken = localStorage.getItem('SessionService.accessToken');

        this.getUser = function(){
          
          return angular.fromJson(this._user);
        };

        this.setUser = function(user){
          this._user = user;
          localStorage.setItem('SessionService.user', JSON.stringify(user));
          return this;
        };

        this.getAccessToken = function(){
          return this._accessToken;
        };

        this.setAccessToken = function(token){

          this._accessToken = token;
          localStorage.setItem('SessionService.accessToken', token);
          return this;
        };

        /**
         * Destroy SessionService
         */
        this.destroy = function destroy(){
          this.setUser(null);
          this.setAccessToken(null);
        };

  }

})();
