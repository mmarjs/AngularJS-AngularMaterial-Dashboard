(function() {
    'use strict';

    angular
        .module('app.limalinks.analytics-ui')
        .service('AnalyticsService', AnalyticsService);

    /* @ngInject */
    function AnalyticsService($q, $http, SessionService, limalinksSettings, $resource, $cookies, APIService, $state) {

        //set specific endpoint for this entity
        var endPoint = "";

        function getEndPoint(type) {
            var objectType = "";
            if (type == "state") {
                var state = $state;
                var current = state.current.name;
                objectType = current.substring(current.indexOf("-") + 1, current.length);
            } else {
                objectType = type;
            }




            switch (objectType) {
                // case "agentperformance":
                //     return endPoint = "/v3/analytics/agentperformance/";
                //     break;
                case "provinces":
                    return endPoint = "/v3/provinces/";
                    break;
                case "districts":
                    return endPoint = "/v3/districts/";
                    break;
                case "towns":
                    return endPoint = "/v3/towns/";
                    break;
                case "wards":
                    return endPoint = "/v3/wards/";
                    break;
                case "markets":
                    return endPoint = "/v3/markets/";
                    break;
                case "packagings":
                    return endPoint = "/v3/packagings/";
                    break;
                case "crops":
                    return endPoint = "/v3/crops/";
                    break;
                case "inputs":
                    return endPoint = "/v3/inputs/";
                    break;
                default:
                    console.log("error");
            }
            console.log(objectType);
        }


        this.query = function(object, type) {
            var endpoint = '/v3/analytics/agentperformance/';
            return APIService.query(object, endpoint);
        }

        this.save = function(object, type) {
            return APIService.save(object, getEndPoint(type));
        }

        this.update = function(object, type) {
            return APIService.update(object, getEndPoint(type));
        }

        this.delete = function(object, type) {
            return APIService.delete(object, getEndPoint(type));
        }

    }
})();