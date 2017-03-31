(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('EditDialogController', EditDialogController);

    /* @ngInject */
    function EditDialogController($state, $mdDialog, selected) {
        var vm = this;
        vm.selected = selected;
        console.log(vm.selected);
        vm.cancel = cancel;
        vm.hide = hide;
        vm.crop = vm.selected[0];

        /////////////////////////

        function hide() {
            $mdDialog.hide(vm.crop);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
