(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name app.limalinks.admin-ui.controller:AddMarketDialogController
     *
     * @description
     * This is a controller for the Add Markets Dialog
     */

    angular
        .module('app.limalinks.admin-ui')
        .controller('AddMarketDialogController', AddMarketDialogController);

    /* @ngInject */
    function AddMarketDialogController($state, $mdDialog, TownService) {
        var vm = this;
        vm.cancel = cancel;
        vm.hide = hide;
        vm.getTowns = getTowns;
        vm.market = {
            name: ''
        };

        /////////////////////////

        function hide() {
            $mdDialog.hide(vm.market);
        }

        function cancel() {
            $mdDialog.cancel();
        }

        vm.getTowns();
        /**
         * @ngdoc method
         * @name getTowns
         * @methodOf app.limalinks.admin-ui.controller:AddMarketDialogController
         * @description
         * Queries API for Towns
         *
         *
         *
         *

        */

        function getTowns() {
            vm.resource = TownService.query();

            vm.resource.then(
              function(res){
                var towns = res.data;
                vm.towns = towns.data;
                console.log(vm.towns);
              },
              function(error){
                //handle error
              }
            );
        }
    }
})();
