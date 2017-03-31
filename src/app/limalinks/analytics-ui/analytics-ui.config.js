(function() {
    'use strict';

    angular
        .module('app.limalinks.analytics-ui')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.analytics-agentperformance', {
            url: '/admin/provinces',
            templateUrl: 'app/limalinks/analytics-ui/analytics-ui.tmpl.html',
            controller: 'D3MultiLineChartController',
            controllerAs: 'vm',
            // layout-column class added to make footer move to
            // bottom of the page on short pages
            data: {
                layout: {
                    contentClass: 'layout-column'
                }
            }
        });

        triMenuProvider.addMenu({
            name: 'Analytics',
            icon: 'zmdi zmdi-chart',
            permission: 'viewAnalytics',
            type: 'dropdown',
            priority: 1.1,
            children: [
              {
                name: 'Market Performance',
                state: 'triangular.analytics-ui',
                type: 'link'
              },
              {
                name: 'Market Agent Performance',
                state: 'triangular.analytics-agentperformance',
                type: 'link'
              },
              {
                name: 'Price Trends',
                state: 'triangular.analytics-ui',
                type: 'link'
              },
              {
                name: 'Top Lists',
                state: 'triangular.analytics-ui',
                type: 'link'
              },
              {
                name: 'Messaging and Promotion Performance',
                state: 'triangular.analytics-ui',
                type: 'link'
              },
              {
                name: 'Packaging Methods',
                state: 'triangular.analytics-ui',
                type: 'link'
              }

            ]
        });
    }
})();
