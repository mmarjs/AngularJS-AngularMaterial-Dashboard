(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('DeleteWardDialogController', DeleteWardDialogController);

    /* @ngInject */
    function DeleteWardDialogController($state, $mdDialog, selected) {
        var vm = this;
        vm.selected = selected;
        console.log(vm.selected);
        vm.cancel = cancel;
        vm.hide = hide;
        vm.ward = {
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
