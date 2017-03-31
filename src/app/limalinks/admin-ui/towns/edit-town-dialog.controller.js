(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('EditTownDialogController', EditTownDialogController);

    /* @ngInject */
    function EditTownDialogController($state, $mdDialog, selected, DistrictService) {
        var vm = this;
        vm.selected = selected;
        console.log(vm.selected);
        vm.cancel = cancel;
        vm.hide = hide;
        vm.getDistricts = getDistricts;
        vm.town = vm.selected[0];

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
