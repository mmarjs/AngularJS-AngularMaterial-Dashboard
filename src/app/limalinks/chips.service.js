(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name app.limalinks.service:ChipService
     *
     * @description
     * This service provides high-level abstraction for all API calls creating chips
     */

    angular
        .module('app.limalinks')
        .service('ChipService', ChipService);

    /* @ngInject */
    function ChipService(){

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

        /**
         * Return the proper object when the append is called.
         */
        this.transformChip = function(chip) {
          // If it is an object, it's already a known chip
          if (angular.isObject(chip)) {
            return chip;
          }

          // Otherwise, create a new one
          return { name: chip, type: 'new' }
        }

        /**
         * Search for crops.
         */
        this.querySearch = function(query, array, callback) {

          var results = query ? array.filter(this.createFilterFor(query)) : [];
          return results;
        }

        /**
         * Create filter function for a query string
         */
        this.createFilterFor = function(query) {
          var lowercaseQuery = angular.lowercase(query);

          return function filterFn(data) {
            return (data._lowerlname.indexOf(lowercaseQuery) === 0) ||
                   (data._lowerfname.indexOf(lowercaseQuery) === 0)
          };

        }

        this.loadData = function(service, callback) {
          self.resource = service.query({});

          self.resource.then(
            function(res){
              var data = res.data.data;

              data = data.map(function (data) {
                data._lowerlname = data.last_name.toLowerCase();
                data._lowerfname = data.first_name.toLowerCase();
                return data;
              });

              callback(data);
            },
            function(error){
              //handle error
            }
          );
        }




  }

})();
