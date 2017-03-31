(function() {
    'use strict';

    angular
        .module('app.limalinks.advertiser-ui')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.advertiser-inputs', {
            url: '/advertiser/inputs',
            templateUrl: 'app/limalinks/admin-ui/admin-ui.tmpl.html',
            controller: 'AdminUIController',
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
            name: 'Advertising',
            icon: 'zmdi zmdi-tv-alt-play',
            permission: 'viewAdvertiserUI',
            type: 'dropdown',
            priority: 1.1,
            children: [
              {
                name: 'Inputs',
                state: 'triangular.advertiser-inputs',
                type: 'link'
              }

            ]
        });
    }
})();
