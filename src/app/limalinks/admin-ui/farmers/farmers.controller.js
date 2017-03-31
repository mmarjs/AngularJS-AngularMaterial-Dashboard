
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name app.limalinks.admin-ui.controller:FarmersController
     *
     * @description
     * This is a controller for the Farmers View
     */


    angular
        .module('app.limalinks.admin-ui')
        .controller('FarmersController', FarmersController);

    /* @ngInject */
    function FarmersController($scope, $timeout, $q, FarmerService, $mdDialog, $rootScope, AlertService) {

        var vm = this;

        //Controller's API

        vm.activate = activate;
        vm.addFarmer = addFarmer;
        vm.deleteFarmer = deleteFarmer;
        vm.editFarmer = editFarmer;
        vm.getFarmers = getFarmers;
        vm.removeFilter = removeFilter;

        vm.query = {
            filter: '',
            limit: '10',
            order: '-id',
            page: 1
        };

        vm.selected = [];

        vm.columns = {

            id: 'ID',
            first_name: 'First Name',
            last_name: 'Last Name',
            address: 'Address',
            email: 'Email',
            phone_number: 'Phone Number',
            date_created: 'Date Created',
            last_updated: 'Last Updated'

        };




        vm.filter = {
            options: {
                debounce: 500
            }
        };


        activate();

        ////////////////

        /**
  			 * @ngdoc method
  			 * @name activate
  			 * @methodOf app.limalinks.admin-ui.controller:FarmersController
  			 * @description
  			 * This method initialises the view by setting default page and querying data
  			 *
  			 *
         *
         *

  			*/

        function activate() {
            var bookmark;
            $scope.$watch('vm.query.search', function (newValue, oldValue) {

                if(!oldValue) {
                    bookmark = vm.query.page;
                }

                if(newValue !== oldValue) {
                    vm.query.page = 1;
                }

                if(!newValue) {
                    vm.query.page = bookmark;
                }

                vm.getFarmers();
            });
        }



        /**
         * @ngdoc method
         * @name removeFilter
         * @methodOf app.limalinks.admin-ui.controller:FarmersController
         * @description
         * This method removes filters and returns view to initial state
         *
         *
         *
         *

        */

        function removeFilter() {
            vm.filter.show = false;
            vm.query.search = '';

            if(vm.filter.form.$dirty) {
                vm.filter.form.$setPristine();
            }
        }

        /**
         * @ngdoc method
         * @name getFarmers
         * @methodOf app.limalinks.admin-ui.controller:FarmersController
         * @description
         * Queries API for view data
         *
         *
         *
         *

        */

        function getFarmers() {
            vm.resource = FarmerService.query();

            vm.resource.then(
              function(res){
                var farmers = res.data;
                vm.farmers = farmers.data;
                vm.total_count = farmers.total_count;
              },
              function(error){
                //handle error
              }
            );
        }

        /**
         * @ngdoc method
         * @name addFarmer
         * @methodOf app.limalinks.admin-ui.controller:FarmersController
         * @description
         * Boardcasts addFarmer event
         *
         *
         *
         *

        */

        function addFarmer($event) {
            $rootScope.$broadcast('addFarmer', $event);
        }

        /**
         * @ngdoc event
         * @name addFarmer
         * @methodOf app.limalinks.admin-ui.controller:FarmersController
         * @description
         * Binds addFarmer event to action
         *
         *
         *
         *

        */

        $scope.$on('addFarmer', function( ev ){
            console.log("SHowing Modal");
            $mdDialog.show({
                templateUrl: 'app/limalinks/admin-ui/farmers/add-farmer-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'AddFarmerDialogController',
                controllerAs: 'vm'
            })
            .then(function(newFarmer) {

                vm.resource = FarmerService.save(newFarmer);
                vm.resource.then(function(res){
                  var farmer = res.data;
                  console.log(farmer.data);
                  vm.farmers.push(farmer.data);
                  AlertService.showAlert('Farmer '+farmer.data.first_name+' '+farmer.data.last_name+' has been added', this);
                }, function(error){});
            });
        });

        /**
         * @ngdoc method
         * @name editFarmer
         * @methodOf app.limalinks.admin-ui.controller:FarmersController
         * @description
         * Boardcasts editFarmer event
         *
         *
         *
         *

        */

        function editFarmer($event) {
            $rootScope.$broadcast('editFarmer', $event);
        }

        /**
         * @ngdoc event
         * @name editFarmer
         * @methodOf app.limalinks.admin-ui.controller:FarmersController
         * @description
         * Binds editFarmer event to action
         *
         *
         *
         *

        */

        $scope.$on('editFarmer', function( ev ){

            $mdDialog.show({
                locals:{selected: vm.selected},
                templateUrl: 'app/limalinks/admin-ui/farmers/edit-farmer-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'EditFarmerDialogController',
                controllerAs: 'vm'
            })
            .then(function(newFarmer) {
                vm.resource = FarmerService.update(newFarmer);
                vm.resource.then(function(res){
                  var farmer = res.data;
                  vm.farmers[vm.farmers.indexOf(newFarmer)] = farmer.data;
                  vm.selected = [];
                  console.log(farmer.data);
                  AlertService.showAlert('Farmer '+farmer.data.first_name+' '+farmer.data.last_name+' has been updated', this);
                }, function(error){});
            });
        });


        /**
         * @ngdoc method
         * @name deleteFarmer
         * @methodOf app.limalinks.admin-ui.controller:FarmersController
         * @description
         * Broadcasts deleteFarmer event
         *
         *
         *
         *

        */

        function deleteFarmer($event) {
            $rootScope.$broadcast('deleteFarmer', $event);
        }


        /**
         * @ngdoc event
         * @name deleteFarmer
         * @methodOf app.limalinks.admin-ui.controller:FarmersController
         * @description
         * Binds deleteFarmer event to action
         *
         *
         *
         *

        */
        $scope.$on('deleteFarmer', function( ev ){

            $mdDialog.show({
                locals:{selected: vm.selected},
                templateUrl: 'app/limalinks/admin-ui/farmers/delete-farmer-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'DeleteFarmerDialogController',
                controllerAs: 'vm'
            })
            .then(function(farmer) {

                //Check all selected farmers and delete them by ID
                angular.forEach(vm.selected,function(farmer){
                    vm.resource = FarmerService.delete(farmer);
                     vm.resource.then(function(res) {
                         vm.farmers.splice(vm.farmers.indexOf(farmer),1);
                         vm.selected = [];
                         AlertService.showAlert('Farmer '+farmer.first_name+' '+farmer.last_name+' has been updated', this);
                     }, function(error) {
                         console.log(error);
                     });
                 });

            });
        });





    }
})();
