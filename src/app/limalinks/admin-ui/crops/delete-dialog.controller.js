(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('DeleteDialogController', DeleteDialogController);

    /* @ngInject */
    function DeleteDialogController($state, $mdDialog, selected) {
        var vm = this;
        vm.selected = selected;
        console.log(vm.selected);
        vm.cancel = cancel;
        vm.hide = hide;
        vm.crop = {
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
