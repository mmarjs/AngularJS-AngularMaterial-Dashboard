(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .service('TownService', TownService);

    /* @ngInject */
    function TownService($q, $http, SessionService, limalinksSettings, $resource, $cookies, APIService){

        //set specific endpoint for this entity
        var endPoint = "/v3/towns/";

        this.query = function(object){
          return APIService.query(object, endPoint);
        }

        this.save = function(object){
          return APIService.save(object, endPoint);
        }

        this.update = function(object){
          return APIService.update(object, endPoint);
        }

        this.delete = function(object){
          return APIService.delete(object, endPoint);
        }

  }

})();
