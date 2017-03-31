(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('DeleteDistrictDialogController', DeleteDistrictDialogController);

    /* @ngInject */
    function DeleteDistrictDialogController($state, $mdDialog, selected) {
        var vm = this;
        vm.selected = selected;
        console.log(vm.selected);
        vm.cancel = cancel;
        vm.hide = hide;
        vm.district = {
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
