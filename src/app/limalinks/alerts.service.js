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
        .service('AlertService', AlertService);

    /* @ngInject */
    function AlertService($mdToast){

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

        this.showAlert = function(message, parent) {
          $mdToast.show({
              template:  '<md-toast><span flex>'+message+'</span></md-toast>',
              position: 'bottom right',
              hideDelay: 3000,
              parent: parent
          });
        };




  }

})();
