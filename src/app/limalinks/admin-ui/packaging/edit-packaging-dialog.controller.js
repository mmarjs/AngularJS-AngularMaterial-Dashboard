(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('EditPackagingDialogController', EditPackagingDialogController);

    /* @ngInject */
    function EditPackagingDialogController($state, $mdDialog, selected) {
        var vm = this;
        vm.selected = selected;
        console.log(vm.selected);
        vm.cancel = cancel;
        vm.hide = hide;
        vm.packaging = vm.selected[0];

        /////////////////////////

        function hide() {
            $mdDialog.hide(vm.packaging);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
