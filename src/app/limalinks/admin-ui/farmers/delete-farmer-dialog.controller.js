(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('DeleteFarmerDialogController', DeleteFarmerDialogController);

    /* @ngInject */
    function DeleteFarmerDialogController($state, $mdDialog, selected) {
        var vm = this;
        vm.selected = selected;
        console.log(vm.selected);
        vm.cancel = cancel;
        vm.hide = hide;
        vm.farmer = {
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
