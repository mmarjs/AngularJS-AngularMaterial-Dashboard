(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider

        .state('triangular.admin-provinces', {
            url: '/admin/provinces',
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
        })
        .state('triangular.admin-districts', {
            url: '/admin/districts',
            //templateUrl: 'app/limalinks/admin-ui/districts/districts.tmpl.html',
            //controller: 'DistrictsController',
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
        })
        .state('triangular.admin-towns', {
            url: '/admin/towns',
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
        })
        .state('triangular.admin-wards', {
            url: '/admin/wards',
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
        })
        .state('triangular.admin-markets', {
            url: '/admin/markets',
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
        })
        .state('triangular.admin-crops', {
            url: '/admin/crops',
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
        })
        .state('triangular.admin-packagings', {
            url: '/admin/packagings',
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
            name: 'Admin',
            icon: 'zmdi zmdi-folder',
            type: 'dropdown',
            permission: 'viewAdminUI',
            priority: 1.1,
            children: [
              {
                name: 'Provinces',
                state: 'triangular.admin-provinces',
                type: 'link'
              },
              {
                name: 'Districts',
                state: 'triangular.admin-districts',
                type: 'link'
              },
              {
                name: 'Wards',
                state: 'triangular.admin-wards',
                type: 'link'
              },
              {
                name: 'Towns',
                state: 'triangular.admin-towns',
                type: 'link'
              },
              {
                name: 'Markets',
                state: 'triangular.admin-markets',
                type: 'link'
              },
              {
                name: 'Crops',
                state: 'triangular.admin-crops',
                type: 'link'
              },
              {
                name: 'Packaging Methods',
                state: 'triangular.admin-packagings',
                type: 'link'
              }

            ]
        });
    }
})();
