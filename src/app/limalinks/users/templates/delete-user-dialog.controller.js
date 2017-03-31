(function() {
    'use strict';

    angular
        .module('app.limalinks.users')
        .controller('DeleteUserDialogController', DeleteUserDialogController);

    /* @ngInject */
    function DeleteUserDialogController($state, $mdDialog, selected) {
        var vm = this;
        vm.selected = selected;
        console.log(vm.selected);
        vm.cancel = cancel;
        vm.hide = hide;
        vm.user = {
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
