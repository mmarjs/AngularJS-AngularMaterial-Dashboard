(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('AddTownDialogController', AddTownDialogController);

    /* @ngInject */
    function AddTownDialogController($state, $mdDialog, DistrictService) {
        var vm = this;
        vm.cancel = cancel;
        vm.hide = hide;
        vm.getDistricts = getDistricts;
        vm.town = {
            name: ''
        };

        /////////////////////////

        function hide() {
            $mdDialog.hide(vm.town);
        }

        function cancel() {
            $mdDialog.cancel();
        }

        vm.getDistricts();
        /**
         * @ngdoc method
         * @name getDistricts
         * @methodOf app.limalinks.admin-ui.controller:AddMarketDialogController
         * @description
         * Queries API for Distr
         *
         *
         *
         *

        */

        function getDistricts() {
            vm.resource = DistrictService.query();

            vm.resource.then(
              function(res){
                var districts = res.data;
                vm.districts = districts.data;

              },
              function(error){
                //handle error
              }
            );
        }
    }
})();
