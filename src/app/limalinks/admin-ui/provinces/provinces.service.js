(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .service('ProvinceService', ProvinceService);

    /* @ngInject */
    function ProvinceService($q, $http, SessionService, limalinksSettings, $resource, $cookies, APIService){

        //set specific endpoint for this entity
        var endPoint = "/v3/provinces/";

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
