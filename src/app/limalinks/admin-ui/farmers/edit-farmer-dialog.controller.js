(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('EditFarmerDialogController', EditFarmerDialogController);

    /* @ngInject */
    function EditFarmerDialogController($state, $mdDialog, selected) {
        var vm = this;
        vm.selected = selected;
        console.log(vm.selected);
        vm.cancel = cancel;
        vm.hide = hide;
        vm.farmer = vm.selected[0];

        /////////////////////////

        function hide() {
            $mdDialog.hide(vm.farmer);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
