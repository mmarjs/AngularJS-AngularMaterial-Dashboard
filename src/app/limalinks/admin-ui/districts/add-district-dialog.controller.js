(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('AddDistrictDialogController', AddDistrictDialogController);

    /* @ngInject */
    function AddDistrictDialogController($state, $mdDialog) {
        var vm = this;
        vm.cancel = cancel;
        vm.hide = hide;
        vm.district = {
            name: ''
        };

        /////////////////////////

        function hide() {
            $mdDialog.hide(vm.district);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
