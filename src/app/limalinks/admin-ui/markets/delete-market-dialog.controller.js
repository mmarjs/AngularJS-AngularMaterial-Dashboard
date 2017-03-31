(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('DeleteMarketDialogController', DeleteMarketDialogController);

    /* @ngInject */
    function DeleteMarketDialogController($state, $mdDialog, selected) {
        var vm = this;
        vm.selected = selected;
        console.log(vm.selected);
        vm.cancel = cancel;
        vm.hide = hide;
        vm.market = {
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
