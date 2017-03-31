
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name app.limalinks.admin-ui.controller:ProvincesController
     *
     * @description
     * This is a controller for the Provinces View
     */


    angular
        .module('app.limalinks.admin-ui')
        .controller('ProvincesController', ProvincesController);

    /* @ngInject */
    function ProvincesController($scope, $timeout, $q, ProvinceService, $mdDialog, $rootScope, AlertService) {

        var vm = this;

        //Controller's API

        vm.activate = activate;
        vm.addProvince = addProvince;
        vm.deleteProvince = deleteProvince;
        vm.editProvince = editProvince;
        vm.getProvinces = getProvinces;
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
            name: 'Province Name',
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
  			 * @methodOf app.limalinks.admin-ui.controller:ProvincesController
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

                vm.getProvinces();
            });
        }



        /**
         * @ngdoc method
         * @name removeFilter
         * @methodOf app.limalinks.admin-ui.controller:ProvincesController
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
         * @name getProvinces
         * @methodOf app.limalinks.admin-ui.controller:ProvincesController
         * @description
         * Queries API for view data
         *
         *
         *
         *

        */

        function getProvinces() {
            vm.resource = ProvinceService.query(vm.query);

            vm.resource.then(
              function(res){
                var provinces = res.data;
                vm.provinces = provinces.data;
                vm.total_count = provinces.total_count;
              },
              function(error){
                //handle error
              }
            );
        }

        /**
         * @ngdoc method
         * @name addProvince
         * @methodOf app.limalinks.admin-ui.controller:ProvincesController
         * @description
         * Boardcasts addProvince event
         *
         *
         *
         *

        */

        function addProvince($event) {
            $rootScope.$broadcast('addProvince', $event);
        }

        /**
         * @ngdoc event
         * @name addProvince
         * @methodOf app.limalinks.admin-ui.controller:ProvincesController
         * @description
         * Binds addProvince event to action
         *
         *
         *
         *

        */

        $scope.$on('addProvince', function( ev ){
            console.log("SHowing Modal");
            $mdDialog.show({
                templateUrl: 'app/limalinks/admin-ui/provinces/add-province-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'AddProvinceDialogController',
                controllerAs: 'vm'
            })
            .then(function(newProvince) {

                ProvinceService.save(newProvince)
                .then(function(res){
                  var province = res.data;
                  vm.provinces.push(province.data);
                  AlertService.showAlert('Province '+province.data.name+' has been added', this);
                }, function(error){});
            });
        });

        /**
         * @ngdoc method
         * @name editProvince
         * @methodOf app.limalinks.admin-ui.controller:ProvincesController
         * @description
         * Boardcasts editProvince event
         *
         *
         *
         *

        */

        function editProvince($event) {
            $rootScope.$broadcast('editProvince', $event);
        }

        /**
         * @ngdoc event
         * @name editProvince
         * @methodOf app.limalinks.admin-ui.controller:ProvincesController
         * @description
         * Binds editProvince event to action
         *
         *
         *
         *

        */

        $scope.$on('editProvince', function( ev ){

            $mdDialog.show({
                locals:{selected: vm.selected},
                templateUrl: 'app/limalinks/admin-ui/provinces/edit-province-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'EditProvinceDialogController',
                controllerAs: 'vm'
            })
            .then(function(newProvince) {
                vm.resource = ProvinceService.update(newProvince);
                vm.resource.then(function(res){
                  var province = res.data;
                  vm.provinces[vm.provinces.indexOf(newProvince)] = province.data;
                  vm.selected = [];
                  AlertService.showAlert('Province '+province.data.name+' has been updated', this);
                }, function(error){});
            });
        });


        /**
         * @ngdoc method
         * @name deleteProvince
         * @methodOf app.limalinks.admin-ui.controller:ProvincesController
         * @description
         * Broadcasts deleteProvince event
         *
         *
         *
         *

        */

        function deleteProvince($event) {
            $rootScope.$broadcast('deleteProvince', $event);
        }


        /**
         * @ngdoc event
         * @name deleteProvince
         * @methodOf app.limalinks.admin-ui.controller:ProvincesController
         * @description
         * Binds deleteProvince event to action
         *
         *
         *
         *

        */
        $scope.$on('deleteProvince', function( ev ){

            $mdDialog.show({
                locals:{selected: vm.selected},
                templateUrl: 'app/limalinks/admin-ui/provinces/delete-province-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'DeleteProvinceDialogController',
                controllerAs: 'vm'
            })
            .then(function(province) {

                //Check all selected provinces and delete them by ID
                angular.forEach(vm.selected,function(province){
                    ProvinceService.delete(province)
                     .then(function(res) {
                         vm.provinces.splice(vm.provinces.indexOf(province),1);
                         vm.selected = [];
                         AlertService.showAlert('Province '+province.name+' has been deleted', this);
                     }, function(error) {
                         console.log(error);
                     });
                 });

            });
        });





    }
})();
