(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('EditWardDialogController', EditWardDialogController);

    /* @ngInject */
    function EditWardDialogController($state, $mdDialog, selected) {
        var vm = this;
        vm.selected = selected;
        console.log(vm.selected);
        vm.cancel = cancel;
        vm.hide = hide;
        vm.ward = vm.selected[0];

        /////////////////////////

        function hide() {
            $mdDialog.hide(vm.ward);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
