(function() {
    'use strict';

    angular
        .module('app')
        .config(translateConfig);

    /* @ngInject */
    function translateConfig(triSettingsProvider, triRouteProvider, limalinksSettingsProvider, $resourceProvider, csrfCDProvider, $httpProvider) {
        var now = new Date();
        // set app name & logo (used in loader, sidemenu, footer, login pages, etc)
        triSettingsProvider.setName('limalinks');
        triSettingsProvider.setCopyright('&copy;' + now.getFullYear() + ' Lima Links');
        triSettingsProvider.setLogo('assets/images/logo-ultra-light.png');
        // set current version of app (shown in footer)
        triSettingsProvider.setVersion('1.0.0');
        // set the document title that appears on the browser tab
        triRouteProvider.setTitle('Lima Links');
        triRouteProvider.setSeparator('|');
        //set the API baseURL
        limalinksSettingsProvider.setAPI('http://ec2-52-32-73-108.us-west-2.compute.amazonaws.com:8000');
        $resourceProvider.defaults.stripTrailingSlashes = false;
        $httpProvider.defaults.xsrfCookieName = 'x-csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';



        $httpProvider.defaults.transformRequest.push(function(data, headersGetter) {
            var currentHeaders = headersGetter();
            // angular.extend(currentHeaders, {'X-CSRFToken':'xxx'});
            //console.info("Current headers", currentHeaders);
            return data;
          });

    }
})();
