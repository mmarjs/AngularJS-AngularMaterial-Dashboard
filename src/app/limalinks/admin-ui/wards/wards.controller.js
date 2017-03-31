
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name app.limalinks.admin-ui.controller:WardsController
     *
     * @description
     * This is a controller for the Wards View
     */


    angular
        .module('app.limalinks.admin-ui')
        .controller('WardsController', WardsController);

    /* @ngInject */
    function WardsController($scope, $timeout, $q, WardService, $mdDialog, $rootScope) {

        var vm = this;

        //Controller's API

        vm.activate = activate;
        vm.addWard = addWard;
        vm.deleteWard = deleteWard;
        vm.editWard = editWard;
        vm.getWards = getWards;
        vm.removeFilter = removeFilter;

        vm.query = {
            search: '',
            limit: '10',
            order: 'name',
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
  			 * @methodOf app.limalinks.admin-ui.controller:WardsController
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

                vm.getWards();
            });
        }



        /**
         * @ngdoc method
         * @name removeFilter
         * @methodOf app.limalinks.admin-ui.controller:WardsController
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
         * @name getWards
         * @methodOf app.limalinks.admin-ui.controller:WardsController
         * @description
         * Queries API for view data
         *
         *
         *
         *

        */

        function getWards() {
            vm.resource = WardService.query(vm.query);

            vm.resource.then(
              function(res){
                var wards = res.data;
                vm.wards = wards.data;
                vm.total_count = wards.total_count;
              },
              function(error){
                //handle error
              }
            );
        }

        /**
         * @ngdoc method
         * @name addWard
         * @methodOf app.limalinks.admin-ui.controller:WardsController
         * @description
         * Boardcasts addWard event
         *
         *
         *
         *

        */

        function addWard($event) {
            $rootScope.$broadcast('addWard', $event);
        }

        /**
         * @ngdoc event
         * @name addWard
         * @methodOf app.limalinks.admin-ui.controller:WardsController
         * @description
         * Binds addWard event to action
         *
         *
         *
         *

        */

        $scope.$on('addWard', function( ev ){
            console.log("SHowing Modal");
            $mdDialog.show({
                templateUrl: 'app/limalinks/admin-ui/wards/add-ward-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'AddWardDialogController',
                controllerAs: 'vm'
            })
            .then(function(newWard) {

                WardService.save(newWard)
                .then(function(res){
                  var ward = res.data;
                  vm.wards.push(ward.data);
                  AlertService.showAlert('Ward '+ward.data.first_name+' '+ward.data.last_name+'has been added', this);
                }, function(error){});
            });
        });

        /**
         * @ngdoc method
         * @name editWard
         * @methodOf app.limalinks.admin-ui.controller:WardsController
         * @description
         * Boardcasts editWard event
         *
         *
         *
         *

        */

        function editWard($event) {
            $rootScope.$broadcast('editWard', $event);
        }

        /**
         * @ngdoc event
         * @name editWard
         * @methodOf app.limalinks.admin-ui.controller:WardsController
         * @description
         * Binds editWard event to action
         *
         *
         *
         *

        */

        $scope.$on('editWard', function( ev ){

            $mdDialog.show({
                locals:{selected: vm.selected},
                templateUrl: 'app/limalinks/admin-ui/wards/edit-ward-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'EditWardDialogController',
                controllerAs: 'vm'
            })
            .then(function(newWard) {
                vm.resource = WardService.update(newWard);
                vm.resource.then(function(res){
                  var ward = res.data;
                  vm.wards[vm.wards.indexOf(newWard)] = ward.data;
                  vm.selected = [];
                  AlertService.showAlert('Ward '+ward.data.first_name+' '+ward.data.last_name+'has been updated', this);
                }, function(error){});
            });
        });


        /**
         * @ngdoc method
         * @name deleteWard
         * @methodOf app.limalinks.admin-ui.controller:WardsController
         * @description
         * Broadcasts deleteWard event
         *
         *
         *
         *

        */

        function deleteWard($event) {
            $rootScope.$broadcast('deleteWard', $event);
        }


        /**
         * @ngdoc event
         * @name deleteWard
         * @methodOf app.limalinks.admin-ui.controller:WardsController
         * @description
         * Binds deleteWard event to action
         *
         *
         *
         *

        */
        $scope.$on('deleteWard', function( ev ){

            $mdDialog.show({
                locals:{selected: vm.selected},
                templateUrl: 'app/limalinks/admin-ui/wards/delete-ward-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'DeleteWardDialogController',
                controllerAs: 'vm'
            })
            .then(function(ward) {

                //Check all selected wards and delete them by ID
                angular.forEach(vm.selected,function(ward){
                    WardService.delete(ward)
                     .then(function(res) {
                         vm.wards.splice(vm.wards.indexOf(ward),1);
                         vm.selected = [];
                         AlertService.showAlert('Ward '+ward.first_name+' '+ward.last_name+'has been deleted', this);
                     }, function(error) {
                         console.log(error);
                     });
                 });

            });
        });





    }
})();
