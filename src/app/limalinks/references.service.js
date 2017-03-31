(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name app.limalinks.service:AlertService
     *
     * @description
     * This service provides high-level abstraction for all API calls.
     */

    angular
        .module('app.limalinks')
        .service('ReferenceService', ReferenceService);

    /* @ngInject */
    function ReferenceService($q, AdminUIService){

        var endpoints = [
          "provinces",
          "districts",
          "towns",
          "wards",
          "packagings",
          "crops",
          "markets",
          "advertisers"
          //"farmers"
          //"agents"
        ];
        var references = [];

        /**
  			 * @ngdoc method
  			 * @name showAlert
  			 * @methodOf app.limalinks.service:AlertService
  			 * @description
  			 * Creates and shows an mdToast at the bottom right with the provided message
  			 *
  			 * @param {string} message Message to display in toast
         *
         *  @param {Object} parent Calling object

  			*/

        this.getReferences = function() {
            var executionCounter = 0;
            return $q(function(resolve, reject) {
                angular.forEach(endpoints,function(endpoint){

                  AdminUIService.query({}, endpoint)

                  .then(
                    function(res){
                      var objects = res.data;
                      references[endpoint] = objects.data;
                      executionCounter ++;
                      // Check that references have been appended before resolving.
                      if (executionCounter == endpoints.length){
                        resolve(references);
                      }


                    },
                    function(error){
                      //handle error
                    }
                  );
                });




            });


        };




  }

})();
