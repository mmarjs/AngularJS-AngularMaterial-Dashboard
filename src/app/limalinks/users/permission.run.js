(function() {
    'use strict';

    angular
        .module('app.limalinks.users')
        .run(permissionRun);

    /* @ngInject */
    function permissionRun($rootScope, $cookies, $state, PermissionStore, RoleStore, UserService, AuthService, SessionService) {
        // normally this would be done at the login page but to show quick
        // demo we grab username from cookie and login the user


        //SessionService.setAccessToken("L7YtPxw6gWtc0Tu96OXbJY3Ja4ROJew4DBu281MMQbDfciax4KzMztkRnT7YkxLT");
        /*if(angular.isDefined(cookieUser)) {
            UserService.login(cookieUser);
        }
        */

        // create permissions and add check function verify all permissions
        var permissions = ['viewDashboard', 'viewAdminUI', 'viewAnalytics', 'viewAdvertiserUI', 'viewUserRoles'];
        PermissionStore.defineManyPermissions(permissions, function (permissionName) {
            return UserService.hasPermission(permissionName);
        });

        // create roles for app
        RoleStore.defineManyRoles({
            'SUPERADMIN': ['viewDashboard', 'viewAdminUI', 'viewAnalytics', 'viewAdvertiserUI', 'viewUserRoles'],
            'ADMIN': ['viewDashboard', 'viewAdminUI', 'viewAnalytics', 'viewAdvertiserUI'],
            'LIMALINKS ORDINARY USER': ['viewDashboard', 'viewAnalytics'],
            'MARKET AGENT': ['viewAnalytics', 'viewAdvertiserUI'],
            'ANONYMOUS': []
        });


        ///////////////////////

        // default redirect if access is denied
        function accessDenied() {
            $state.go('401');
        }

        // watches

        // redirect all denied permissions to 401
        var deniedHandle = $rootScope.$on('$stateChangePermissionDenied', accessDenied);

        // remove watch on destroy
        $rootScope.$on('$destroy', function() {
            deniedHandle();
        });
    }
})();
