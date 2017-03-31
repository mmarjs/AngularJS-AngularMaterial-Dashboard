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
        .directive('compareTo', compareTo);

    /* @ngInject */
    function compareTo(){

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

        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };




  }

})();
