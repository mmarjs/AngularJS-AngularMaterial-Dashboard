(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('DialogController', DialogController);

    /* @ngInject */
    function DialogController($state, $mdDialog) {
        var vm = this;
        vm.cancel = cancel;
        vm.hide = hide;
        vm.crop = {
            name: ''
        };

        /////////////////////////

        function hide() {
            $mdDialog.hide(vm.crop);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
