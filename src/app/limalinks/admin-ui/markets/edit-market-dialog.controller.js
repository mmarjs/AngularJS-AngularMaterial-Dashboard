(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('EditMarketDialogController', EditMarketDialogController);

    /* @ngInject */
    function EditMarketDialogController($state, $mdDialog, selected, TownService) {
        var vm = this;
        vm.selected = selected;
        vm.getTowns = getTowns;
        console.log(vm.selected);
        vm.cancel = cancel;
        vm.hide = hide;
        vm.market = vm.selected[0];

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
         * @name getMarkets
         * @methodOf app.limalinks.admin-ui.controller:MarketsController
         * @description
         * Queries API for view data
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
