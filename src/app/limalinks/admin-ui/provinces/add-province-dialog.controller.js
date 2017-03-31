(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('AddProvinceDialogController', AddProvinceDialogController);

    /* @ngInject */
    function AddProvinceDialogController($state, $mdDialog) {
        var vm = this;
        vm.cancel = cancel;
        vm.hide = hide;
        vm.province = {
            name: ''
        };

        /////////////////////////

        function hide() {
            $mdDialog.hide(vm.province);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
