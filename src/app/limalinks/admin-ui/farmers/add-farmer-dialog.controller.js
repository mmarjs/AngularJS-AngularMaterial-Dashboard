(function() {
    'use strict';

    angular
        .module('app.limalinks.admin-ui')
        .controller('AddFarmerDialogController', AddFarmerDialogController);

    /* @ngInject */
    function AddFarmerDialogController($state, $mdDialog) {
        var vm = this;
        vm.cancel = cancel;
        vm.hide = hide;
        vm.farmer = {

            crop_refs:[],
            agent_refs:[]
        };




        vm.genders = [
          {
            id: 0,
            name: 'Male',
            abbreviation:'M'
          },
          {
            id: 1,
            name: 'Female',
            abbreviation:'F'
          }
        ];

        /////////////////////////

        function hide() {
          vm.farmer.crop_refs = vm.farmer.crop_refs.map(function(crop) {
            crop = crop.id;
            return crop;
          });

          vm.farmer.agent_refs = vm.farmer.agent_refs.map(function(agent) {
            agent = agent.id;
            return agent;
          });
          $mdDialog.hide(vm.farmer);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
