
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name app.limalinks.admin-ui.controller:CropsController
     *
     * @description
     * This is a controller for the Crops View
     */


    angular
        .module('app.limalinks.admin-ui')
        .controller('CropsController', CropsController);

    /* @ngInject */
    function CropsController($scope, $timeout, $q, CropService, $mdDialog, $rootScope, $mdToast, AlertService) {

        var vm = this;

        //Controller's API
        vm.columns = [];
        vm.activate = activate;
        vm.addCrop = addCrop;
        vm.deleteCrop = deleteCrop;
        vm.editCrop = editCrop;
        vm.getCrops = getCrops;
        vm.removeFilter = removeFilter;
        vm.createColumns = createColumns;

        vm.query = {
            search: '',
            limit: '10',
            order: 'name',
            page: 1
        };

        vm.selected = [];





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
  			 * @methodOf app.limalinks.admin-ui.controller:CropsController
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

                vm.getCrops();

            });
        }


        /**
  			 * @ngdoc method
  			 * @name createColumns
  			 * @methodOf app.limalinks.admin-ui.controller:CropsController
  			 * @description
  			 * This methods creates table columns of master view
  			 *
  			 *
         *
         *

  			*/

        function createColumns() {

          angular.forEach(vm.model, function(config, column){
            console.log(config);
            if(config.hasOwnProperty("table_index")){
              vm.columns.push({name: column, table_index:config.table_index, label: config.label});
            }
          });
          console.log(vm.columns);
        }



        /**
         * @ngdoc method
         * @name removeFilter
         * @methodOf app.limalinks.admin-ui.controller:CropsController
         * @description
         * This method removes filters and returns view to initial state
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
         * @name getCrops
         * @methodOf app.limalinks.admin-ui.controller:CropsController
         * @description
         * Queries API for view data
         *
         *

        */

        function getCrops() {
            vm.resource = CropService.query(vm.query);

            vm.resource.then(
              function(res){
                var crops = res.data;
                vm.crops = crops.data;
                vm.model = crops.model;
                vm.createColumns();
                vm.total_count = crops.total_count;
              },
              function(error){
                //handle error
              }
            );
        }



        /**
         * @ngdoc method
         * @name addCrop
         * @methodOf app.limalinks.admin-ui.controller:CropsController
         * @description
         * Boardcasts addCrop event
         *
         *

        */

        function addCrop($event) {
            $rootScope.$broadcast('addCrop', $event);
        }

        /**
         * @ngdoc event
         * @name addCrop
         * @methodOf app.limalinks.admin-ui.controller:CropsController
         * @description
         * Binds addCrop event to action
         *
         *

        */

        $scope.$on('addCrop', function( ev ){
            console.log("SHowing Modal");
            $mdDialog.show({
                templateUrl: 'app/limalinks/admin-ui/crops/add-crop-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'DialogController',
                controllerAs: 'vm'
            })
            .then(function(newCrop) {

                CropService.save(newCrop)
                .then(function(res){
                  var crop = res.data;
                  vm.crops.push(crop.data);
                  AlertService.showAlert('Crop '+crop.data.name+' has been added', this);
                }, function(error){});
            });
        });

        /**
         * @ngdoc method
         * @name editCrop
         * @methodOf app.limalinks.admin-ui.controller:CropsController
         * @description
         * Boardcasts editCrop event
         *
         *

        */

        function editCrop($event) {
            $rootScope.$broadcast('editCrop', $event);
        }

        /**
         * @ngdoc event
         * @name editCrop
         * @methodOf app.limalinks.admin-ui.controller:CropsController
         * @description
         * Binds editCrop event to action
         *
         *

        */

        $scope.$on('editCrop', function( ev ){

            $mdDialog.show({
                locals:{selected: vm.selected},
                templateUrl: 'app/limalinks/admin-ui/crops/edit-crop-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'EditDialogController',
                controllerAs: 'vm'
            })
            .then(function(newCrop) {
                vm.resource = CropService.update(newCrop);
                vm.resource.then(function(res){
                  var crop = res.data;
                  vm.crops[vm.crops.indexOf(newCrop)] = crop.data;
                  vm.selected = [];
                  /*$mdToast.show({
                      template:  '<md-toast><span flex>'+crop.data.name+' has been updated</span></md-toast>',
                      position: 'bottom right',
                      hideDelay: 3000,
                      parent: this
                  });*/

                  AlertService.showAlert('Crop '+crop.data.name+' has been updated', this);
                }, function(error){});
            });
        });


        /**
         * @ngdoc method
         * @name deleteCrop
         * @methodOf app.limalinks.admin-ui.controller:CropsController
         * @description
         * Broadcasts deleteCrop event
         *
         *

        */

        function deleteCrop($event) {
            $rootScope.$broadcast('deleteCrop', $event);
        }


        /**
         * @ngdoc event
         * @name deleteCrop
         * @methodOf app.limalinks.admin-ui.controller:CropsController
         * @description
         * Binds deleteCrop event to action
         *
         *

        */
        $scope.$on('deleteCrop', function( ev ){

            $mdDialog.show({
                locals:{selected: vm.selected},
                templateUrl: 'app/limalinks/admin-ui/crops/delete-crop-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'DeleteDialogController',
                controllerAs: 'vm'
            })
            .then(function(crop) {

                //Check all selected crops and delete them by ID
                angular.forEach(vm.selected,function(crop){
                    CropService.delete(crop)
                     .then(function(res) {
                         vm.crops.splice(vm.crops.indexOf(crop),1);
                         vm.selected = [];
                         AlertService.showAlert('Crop '+crop.name+' has been deleted', this);
                     }, function(error) {
                         console.log(error);
                     });
                 });

            });
        });





    }
})();
