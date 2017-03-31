(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('EditDistrictDialogController', EditDistrictDialogController);

    /* @ngInject */
    function EditDistrictDialogController($state, $mdDialog, selected) {
        var vm = this;
        vm.selected = selected;
        console.log(vm.selected);
        vm.cancel = cancel;
        vm.hide = hide;
        vm.district = vm.selected[0];

        /////////////////////////

        function hide() {
            $mdDialog.hide(vm.district);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
