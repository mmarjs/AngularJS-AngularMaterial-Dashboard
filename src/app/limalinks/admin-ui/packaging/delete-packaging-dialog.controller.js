(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('DeletePackagingDialogController', DeletePackagingDialogController);

    /* @ngInject */
    function DeletePackagingDialogController($state, $mdDialog, selected) {
        var vm = this;
        vm.selected = selected;
        console.log(vm.selected);
        vm.cancel = cancel;
        vm.hide = hide;
        vm.packaging = {
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
