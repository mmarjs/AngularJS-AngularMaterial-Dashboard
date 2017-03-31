(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('EditObjectDialogController', EditObjectDialogController);

    /* @ngInject */
    function EditObjectDialogController($state, $mdDialog, data) {
        var vm = this;
        vm.model = data.model;
        vm.selected = data.selected;
        console.log(vm.selected);
        vm.cancel = cancel;
        vm.hide = hide;
        vm.object = vm.selected[0];

        /////////////////////////

        function hide() {
            $mdDialog.hide(vm.object);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
