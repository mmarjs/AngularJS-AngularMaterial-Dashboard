(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('EditProvinceDialogController', EditProvinceDialogController);

    /* @ngInject */
    function EditProvinceDialogController($state, $mdDialog, selected) {
        var vm = this;
        vm.selected = selected;
        console.log(vm.selected);
        vm.cancel = cancel;
        vm.hide = hide;
        vm.province = vm.selected[0];

        /////////////////////////

        function hide() {
            $mdDialog.hide(vm.province);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
