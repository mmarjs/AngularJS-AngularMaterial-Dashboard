(function() {
    'use strict';

    angular
        .module('app.limalinks', [
            'app.limalinks.dashboard',
            'app.limalinks.admin-ui',
            'app.limalinks.analytics-ui',
            'app.limalinks.advertiser-ui',
            'app.limalinks.authentication',
            'app.limalinks.users'

        ]);
})();
