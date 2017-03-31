(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('DeleteObjectDialogController', DeleteObjectDialogController);

    /* @ngInject */
    function DeleteObjectDialogController($state, $mdDialog, data) {
        var vm = this;
        vm.selected = data.selected;
        vm.model = data.model;
        console.log(vm.selected);
        vm.cancel = cancel;
        vm.hide = hide;
        vm.object = {
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
