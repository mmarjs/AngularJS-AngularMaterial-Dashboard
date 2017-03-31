
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name app.limalinks.admin-ui.controller:DistrictsController
     *
     * @description
     * This is a controller for the Districts View
     */


    angular
        .module('app.limalinks.admin-ui')
        .controller('DistrictsController', DistrictsController);

    /* @ngInject */
    function DistrictsController($scope, $timeout, $q, DistrictService, $mdDialog, $rootScope, AlertService) {

        var vm = this;

        //Controller's API

        vm.activate = activate;
        vm.addDistrict = addDistrict;
        vm.deleteDistrict = deleteDistrict;
        vm.editDistrict = editDistrict;
        vm.getDistricts = getDistricts;
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
            name: 'District Name',
            datecreated: 'Date Created',
            lastupdated: 'Last Updated'

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
  			 * @methodOf app.limalinks.admin-ui.controller:DistrictsController
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

                vm.getDistricts();
            });
        }



        /**
         * @ngdoc method
         * @name removeFilter
         * @methodOf app.limalinks.admin-ui.controller:DistrictsController
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
         * @name getDistricts
         * @methodOf app.limalinks.admin-ui.controller:DistrictsController
         * @description
         * Queries API for view data
         *
         *
         *
         *

        */

        function getDistricts() {
            vm.resource = DistrictService.query(vm.query);

            vm.resource.then(
              function(res){
                var districts = res.data;
                vm.districts = districts.data;
                vm.total_count = districts.total_count;
              },
              function(error){
                //handle error
              }
            );
        }

        /**
         * @ngdoc method
         * @name addDistrict
         * @methodOf app.limalinks.admin-ui.controller:DistrictsController
         * @description
         * Boardcasts addDistrict event
         *
         *
         *
         *

        */

        function addDistrict($event) {
            $rootScope.$broadcast('addDistrict', $event);
        }

        /**
         * @ngdoc event
         * @name addDistrict
         * @methodOf app.limalinks.admin-ui.controller:DistrictsController
         * @description
         * Binds addDistrict event to action
         *
         *
         *
         *

        */

        $scope.$on('addDistrict', function( ev ){
            console.log("SHowing Modal");
            $mdDialog.show({
                templateUrl: 'app/limalinks/admin-ui/districts/add-district-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'AddDistrictDialogController',
                controllerAs: 'vm'
            })
            .then(function(newDistrict) {

                DistrictService.save(newDistrict)
                .then(function(res){
                  var district = res.data;
                  vm.districts.push(district.data);
                  AlertService.showAlert('District '+district.data.name+' has been added', this);
                }, function(error){});
            });
        });

        /**
         * @ngdoc method
         * @name editDistrict
         * @methodOf app.limalinks.admin-ui.controller:DistrictsController
         * @description
         * Boardcasts editDistrict event
         *
         *
         *
         *

        */

        function editDistrict($event) {
            $rootScope.$broadcast('editDistrict', $event);
        }

        /**
         * @ngdoc event
         * @name editDistrict
         * @methodOf app.limalinks.admin-ui.controller:DistrictsController
         * @description
         * Binds editDistrict event to action
         *
         *
         *
         *

        */

        $scope.$on('editDistrict', function( ev ){

            $mdDialog.show({
                locals:{selected: vm.selected},
                templateUrl: 'app/limalinks/admin-ui/districts/edit-district-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'EditDistrictDialogController',
                controllerAs: 'vm'
            })
            .then(function(newDistrict) {
                vm.resource = DistrictService.update(newDistrict);
                vm.resource.then(function(res){
                  var district = res.data;
                  vm.districts[vm.districts.indexOf(newDistrict)] = district.data;
                  vm.selected = [];
                  AlertService.showAlert('District '+district.data.name+' has been updated', this);
                }, function(error){});
            });
        });


        /**
         * @ngdoc method
         * @name deleteDistrict
         * @methodOf app.limalinks.admin-ui.controller:DistrictsController
         * @description
         * Broadcasts deleteDistrict event
         *
         *
         *
         *

        */

        function deleteDistrict($event) {
            $rootScope.$broadcast('deleteDistrict', $event);
        }


        /**
         * @ngdoc event
         * @name deleteDistrict
         * @methodOf app.limalinks.admin-ui.controller:DistrictsController
         * @description
         * Binds deleteDistrict event to action
         *
         *
         *
         *

        */
        $scope.$on('deleteDistrict', function( ev ){

            $mdDialog.show({
                locals:{selected: vm.selected},
                templateUrl: 'app/limalinks/admin-ui/districts/delete-district-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'DeleteDistrictDialogController',
                controllerAs: 'vm'
            })
            .then(function(district) {

                //Check all selected districts and delete them by ID
                angular.forEach(vm.selected,function(district){
                    DistrictService.delete(district)
                     .then(function(res) {
                         vm.districts.splice(vm.districts.indexOf(district),1);
                         vm.selected = [];
                         AlertService.showAlert('District '+district.name+' has been deleted', this);
                     }, function(error) {
                         console.log(error);
                     });
                 });

            });
        });





    }
})();
