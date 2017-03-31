(function() {
    'use strict';

    angular
        .module('app.limalinks.users')
        .config(permissionConfig);

    /* @ngInject */
    function permissionConfig($stateProvider, triMenuProvider) {
        $stateProvider
        .state('triangular.users-administrators', {
            url: '/users/administrators',
            templateUrl: 'app/limalinks/users/templates/users.tmpl.html',
            controller: 'UsersController',
            controllerAs: 'vm',
            data: {
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })

        .state('triangular.users-farmers', {
            url: '/users/farmers',
            templateUrl: 'app/limalinks/users/templates/users.tmpl.html',
            controller: 'UsersController',
            controllerAs: 'vm',
            data: {
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })

        .state('triangular.users-agents', {
            url: '/users/agents',
            templateUrl: 'app/limalinks/users/templates/users.tmpl.html',
            controller: 'UsersController',
            controllerAs: 'vm',
            data: {
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })

        .state('triangular.users-aggregators', {
            url: '/users/aggregators',
            templateUrl: 'app/limalinks/users/templates/users.tmpl.html',
            controller: 'UsersController',
            controllerAs: 'vm',
            data: {
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })

        .state('triangular.users-analytics', {
            url: '/users/analytics',
            templateUrl: 'app/limalinks/users/templates/users.tmpl.html',
            controller: 'UsersController',
            controllerAs: 'vm',
            data: {
                layout: {
                    contentClass: 'layout-column'
                }
            }
        })

        .state('triangular.users-advertisers', {
            url: '/users/advertisers',
            templateUrl: 'app/limalinks/users/templates/users.tmpl.html',
            controller: 'UsersController',
            controllerAs: 'vm',
            data: {
                layout: {
                    contentClass: 'layout-column'
                }
            }
        });



        triMenuProvider.addMenu({
            name: 'Users & Roles',
            icon: 'zmdi zmdi-lock',
            type: 'dropdown',
            permission: 'viewUserRoles',
            priority: 4.1,
            children: [/*{
                name: 'Permissions',
                state: 'triangular.users',
                type: 'link'
            },*/

            {
              name: 'Administrators',
              state: 'triangular.users-administrators',
              type: 'link'
            },
            {
              name: 'Farmers',
              state: 'triangular.users-farmers',
              type: 'link'
            },
            {
              name: 'Market Agents',
              state: 'triangular.users-agents',
              type: 'link'
            },
            {
              name: 'Aggregators',
              state: 'triangular.users-aggregators',
              type: 'link'
            },
            {
              name: 'Advertisers',
              state: 'triangular.users-advertisers',
              type: 'link'
            },
            {
              name: 'Analytics Users',
              state: 'triangular.users-analytics',
              type: 'link'
            }

          ]
        });
    }
})();
