(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('DeleteProvinceDialogController', DeleteProvinceDialogController);

    /* @ngInject */
    function DeleteProvinceDialogController($state, $mdDialog, selected) {
        var vm = this;
        vm.selected = selected;
        console.log(vm.selected);
        vm.cancel = cancel;
        vm.hide = hide;
        vm.province = {
            name: ''
        };

        /////////////////////////

        function hide() {
            $mdDialog.hide(true);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
