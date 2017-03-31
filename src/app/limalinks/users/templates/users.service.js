(function() {
    'use strict';

    angular
        .module('app.limalinks.users')
        .service('UsersService', UsersService);

    /* @ngInject */
    function UsersService($q, $http, SessionService, limalinksSettings, $resource, $cookies, APIService, $state) {

        //set specific endpoint for this entity
        var endPoint = "";
        var seldata = [];



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
                case "administrators":
                    return endPoint = "/v3/admins/"
                    break;
                case "farmers":
                    return endPoint = "/v3/farmers/"
                    break;
                case "agents":
                    return endPoint = "/v3/agents/"
                    break;
                case "advertisers":
                    return endPoint = "/v3/advertisers/"
                    break;
                case "aggregators":
                    return endPoint = "/v3/aggregators/"
                    break;
                case "analytics":
                    return endPoint = "/v3/analytics/"
                    break;
                default:
                    console.log("error");
            }

        }



        this.query = function(object, type) {
            console.log(type);
            return APIService.query(object, getEndPoint(type));
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