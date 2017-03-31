(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('AddWardDialogController', AddWardDialogController);

    /* @ngInject */
    function AddWardDialogController($state, $mdDialog) {
        var vm = this;
        vm.cancel = cancel;
        vm.hide = hide;
        vm.ward = {
            name: ''
        };

        /////////////////////////

        function hide() {
            $mdDialog.hide(vm.ward);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
