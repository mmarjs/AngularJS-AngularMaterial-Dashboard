
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name app.limalinks.admin-ui.controller:PackagingController
     *
     * @description
     * This is a controller for the Packaging View
     */


    angular
        .module('app.limalinks.admin-ui')
        .controller('PackagingController', PackagingController);

    /* @ngInject */
    function PackagingController($scope, $timeout, $q, PackagingService, $mdDialog, $rootScope, AlertService) {

        var vm = this;

        //Controller's API

        vm.activate = activate;
        vm.addPackaging = addPackaging;
        vm.deletePackaging = deletePackaging;
        vm.editPackaging = editPackaging;
        vm.getPackaging = getPackaging;
        vm.removeFilter = removeFilter;

        vm.query = {
            search: '',
            limit: '10',
            order: '-id',
            page: 1
        };

        vm.selected = [];

        vm.columns = {

            id: 'ID',
            name: 'Packaging Name',
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
  			 * @methodOf app.limalinks.admin-ui.controller:PackagingController
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

                vm.getPackaging();
            });
        }



        /**
         * @ngdoc method
         * @name removeFilter
         * @methodOf app.limalinks.admin-ui.controller:PackagingController
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
         * @name getPackaging
         * @methodOf app.limalinks.admin-ui.controller:PackagingController
         * @description
         * Queries API for view data
         *
         *
         *
         *

        */

        function getPackaging() {
            vm.resource = PackagingService.query(vm.query);

            vm.resource.then(
              function(res){
                var packaging = res.data;
                vm.packaging = packaging.data;
                vm.total_count = packaging.total_count;
              },
              function(error){
                //handle error
              }
            );
        }

        /**
         * @ngdoc method
         * @name addPackaging
         * @methodOf app.limalinks.admin-ui.controller:PackagingController
         * @description
         * Boardcasts addPackaging event
         *
         *
         *
         *

        */

        function addPackaging($event) {
            $rootScope.$broadcast('addPackaging', $event);
        }

        /**
         * @ngdoc event
         * @name addPackaging
         * @methodOf app.limalinks.admin-ui.controller:PackagingController
         * @description
         * Binds addPackaging event to action
         *
         *
         *
         *

        */

        $scope.$on('addPackaging', function( ev ){
            console.log("SHowing Modal");
            $mdDialog.show({
                templateUrl: 'app/limalinks/admin-ui/packaging/add-packaging-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'AddPackagingDialogController',
                controllerAs: 'vm'
            })
            .then(function(newPackaging) {

                PackagingService.save(newPackaging)
                .then(function(res){
                  var packaging = res.data;
                  vm.packaging.push(packaging.data);
                  AlertService.showAlert('Packaging Method '+packaging.data.name+' has been added', this);
                }, function(error){});
            });
        });

        /**
         * @ngdoc method
         * @name editPackaging
         * @methodOf app.limalinks.admin-ui.controller:PackagingController
         * @description
         * Boardcasts editPackaging event
         *
         *
         *
         *

        */

        function editPackaging($event) {
            $rootScope.$broadcast('editPackaging', $event);
        }

        /**
         * @ngdoc event
         * @name editPackaging
         * @methodOf app.limalinks.admin-ui.controller:PackagingController
         * @description
         * Binds editPackaging event to action
         *
         *
         *
         *

        */

        $scope.$on('editPackaging', function( ev ){

            $mdDialog.show({
                locals:{selected: vm.selected},
                templateUrl: 'app/limalinks/admin-ui/packaging/edit-packaging-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'EditPackagingDialogController',
                controllerAs: 'vm'
            })
            .then(function(newPackaging) {
                vm.resource = PackagingService.update(newPackaging);
                vm.resource.then(function(res){
                  var packaging = res.data;
                  vm.packaging[vm.packaging.indexOf(newPackaging)] = packaging.data;
                  vm.selected = [];
                  AlertService.showAlert('Packaging Method '+packaging.data.name+' has been updated', this);

                }, function(error){});
            });
        });


        /**
         * @ngdoc method
         * @name deletePackaging
         * @methodOf app.limalinks.admin-ui.controller:PackagingController
         * @description
         * Broadcasts deletePackaging event
         *
         *
         *
         *

        */

        function deletePackaging($event) {
            $rootScope.$broadcast('deletePackaging', $event);
        }


        /**
         * @ngdoc event
         * @name deletePackaging
         * @methodOf app.limalinks.admin-ui.controller:PackagingController
         * @description
         * Binds deletePackaging event to action
         *
         *
         *
         *

        */
        $scope.$on('deletePackaging', function( ev ){

            $mdDialog.show({
                locals:{selected: vm.selected},
                templateUrl: 'app/limalinks/admin-ui/packaging/delete-packaging-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'DeletePackagingDialogController',
                controllerAs: 'vm'
            })
            .then(function(packaging) {

                //Check all selected packaging and delete them by ID
                angular.forEach(vm.selected,function(packaging){
                    PackagingService.delete(packaging)
                     .then(function(res) {
                         vm.packaging.splice(vm.packaging.indexOf(packaging),1);
                         vm.selected = [];
                         AlertService.showAlert('Packaging Method '+packaging.name+' has been deleted', this);
                     }, function(error) {
                         console.log(error);
                     });
                 });

            });
        });





    }
})();
