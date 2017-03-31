(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('AddPackagingDialogController', AddPackagingDialogController);

    /* @ngInject */
    function AddPackagingDialogController($state, $mdDialog) {
        var vm = this;
        vm.cancel = cancel;
        vm.hide = hide;
        vm.packaging = {
            name: ''
        };

        /////////////////////////

        function hide() {
            $mdDialog.hide(vm.packaging);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
