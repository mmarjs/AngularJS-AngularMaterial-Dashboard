(function() {
    'use strict';

    angular
        .module('app.limalinks.users')
        .controller('EditUserDialogController', EditUserDialogController);

    /* @ngInject */
    function EditUserDialogController($state, $mdDialog, data) {
        var vm = this;
        vm.model = data.model;
        vm.selected = data.selected;
        console.log(vm.selected);
        vm.cancel = cancel;
        vm.hide = hide;
        vm.user = vm.selected[0];

        /////////////////////////

        function hide() {
            $mdDialog.hide(vm.user);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
