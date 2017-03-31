(function() {
    'use strict';

    angular
        .module('app')
        .provider('limalinksSettings', SettingsProvider);

    /* @ngInject */
    function SettingsProvider() {
        // Provider
        var settings = {
            API: ''
        };

        this.setAPI = setAPI;




        function setAPI(api) {
            settings.API = api;
        }



        // Service
        this.$get = function() {
            return {
                API: settings.API
            };
        };
    }
})();
