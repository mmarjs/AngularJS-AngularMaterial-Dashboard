(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name app.limalinks.service:APIService
     *
     * @description
     * This service provides high-level abstraction for all API calls.
     */

    angular
        .module('app.limalinks')
        .service('APIService', APIService);

    /* @ngInject */
    function APIService($q, $http, SessionService, limalinksSettings, $resource, $cookies) {
        //get base URL from settings
        var baseURL = limalinksSettings.API;
        var authtoken = SessionService.getAccessToken();

        /**
  			 * @ngdoc method
  			 * @name query
  			 * @methodOf app.limalinks.service:APIService
  			 * @description
  			 * This method queries the API using the GET method
  			 *
  			 * @param {Object} object specific object to retrieve. Leave blank to return all objects
         *
         * @returns {$promise} $http promise

  			*/

        this.query = function(object, endpoint) {

            console.log(baseURL);

            return $http({
                url: baseURL + endpoint,
                method: 'GET',
                params: object,
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    // "X-CSRFToken": csrftoken,
                    "Authorization": authtoken
                }
            });
            // console.log(data);

        };


        /**
         * @ngdoc method
         * @name save
         * @methodOf app.limalinks.service:APIService
         * @description
         * This method is for creating instances of entities via the API
         *
         * @param {Object} object object to create
         *
         * @returns {$promise} $http promise

        */

        this.save = function(object, endpoint) {
            return $http({
                url: baseURL + endpoint,
                method: 'POST',
                data: object,
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    //"X-CSRFToken" : csrftoken
                    "Authorization": authtoken

                }
            });
        };

        /**
         * @ngdoc method
         * @name update
         * @methodOf app.limalinks.service:APIService
         * @description
         * This method is for updating instances of entities via the API
         *
         * @param {Object} object object to update
         *
         * @returns {$promise} $http promise

        */

        this.update = function(object, endpoint) {
            return $http({
                url: baseURL + endpoint,
                method: 'PATCH',
                data: object,
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "Authorization": authtoken
                }
            });
        };


        /**
         * @ngdoc method
         * @name delete
         * @methodOf app.limalinks.service:APIService
         * @description
         * This method is for deleting instances of entities via the API
         *
         * @param {Object} object object to delete
         *
         * @returns {$promise} $http promise

        */

        this.delete = function(object, endpoint) {
            return $http({
                url: baseURL + endpoint,
                method: 'DELETE',
                data: {
                    id: object.id
                },
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "Authorization": authtoken
                }
            });
        };

    }

})();