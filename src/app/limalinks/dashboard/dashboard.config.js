(function() {
    'use strict';

    angular
        .module('app.limalinks.dashboard')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.dashboard', {
            url: '/limalinks/dashboard',
            templateUrl: 'app/limalinks/dashboard/dashboard.tmpl.html',
            // set the controller to load for this page
            controller: 'DashboardController',
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
            name: 'Dashboard',
            icon: 'zmdi zmdi-view-dashboard',
            permission: 'viewDashboard',
            type: 'dropdown',
            priority: 1.1,
            children: [{
                name: 'Start Page',
                state: 'triangular.dashboard',
                type: 'link'
            }]
        });
    }
})();
