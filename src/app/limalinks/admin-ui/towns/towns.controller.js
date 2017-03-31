
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name app.limalinks.admin-ui.controller:TownsController
     *
     * @description
     * This is a controller for the Towns View
     */


    angular
        .module('app.limalinks.admin-ui')
        .controller('TownsController', TownsController);

    /* @ngInject */
    function TownsController($scope, $timeout, $q, TownService, $mdDialog, $rootScope, AlertService) {

        var vm = this;

        //Controller's API

        vm.activate = activate;
        vm.addTown = addTown;
        vm.deleteTown = deleteTown;
        vm.editTown = editTown;
        vm.getTowns = getTowns;
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
            name: 'Town Name',
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
  			 * @methodOf app.limalinks.admin-ui.controller:TownsController
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

                vm.getTowns();
            });
        }



        /**
         * @ngdoc method
         * @name removeFilter
         * @methodOf app.limalinks.admin-ui.controller:TownsController
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
         * @name getTowns
         * @methodOf app.limalinks.admin-ui.controller:TownsController
         * @description
         * Queries API for view data
         *
         *
         *
         *

        */

        function getTowns() {
            vm.resource = TownService.query(vm.query);

            vm.resource.then(
              function(res){
                var towns = res.data;
                vm.towns = towns.data;
                vm.total_count = towns.total_count;
              },
              function(error){
                //handle error
              }
            );
        }

        /**
         * @ngdoc method
         * @name addTown
         * @methodOf app.limalinks.admin-ui.controller:TownsController
         * @description
         * Boardcasts addTown event
         *
         *
         *
         *

        */

        function addTown($event) {
            $rootScope.$broadcast('addTown', $event);
        }

        /**
         * @ngdoc event
         * @name addTown
         * @methodOf app.limalinks.admin-ui.controller:TownsController
         * @description
         * Binds addTown event to action
         *
         *
         *
         *

        */

        $scope.$on('addTown', function( ev ){
            console.log("SHowing Modal");
            $mdDialog.show({
                templateUrl: 'app/limalinks/admin-ui/towns/add-town-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'AddTownDialogController',
                controllerAs: 'vm'
            })
            .then(function(newTown) {

                TownService.save(newTown)
                .then(function(res){
                  var town = res.data;
                  vm.towns.push(town.data);
                  AlertService.showAlert('Town '+town.data.name+' has been added', this);
                }, function(error){});
            });
        });

        /**
         * @ngdoc method
         * @name editTown
         * @methodOf app.limalinks.admin-ui.controller:TownsController
         * @description
         * Boardcasts editTown event
         *
         *
         *
         *

        */

        function editTown($event) {
            $rootScope.$broadcast('editTown', $event);
        }

        /**
         * @ngdoc event
         * @name editTown
         * @methodOf app.limalinks.admin-ui.controller:TownsController
         * @description
         * Binds editTown event to action
         *
         *
         *
         *

        */

        $scope.$on('editTown', function( ev ){

            $mdDialog.show({
                locals:{selected: vm.selected},
                templateUrl: 'app/limalinks/admin-ui/towns/edit-town-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'EditTownDialogController',
                controllerAs: 'vm'
            })
            .then(function(newTown) {
                vm.resource = TownService.update(newTown);
                vm.resource.then(function(res){
                  var town = res.data;
                  vm.towns[vm.towns.indexOf(newTown)] = town.data;
                  vm.selected = [];
                  AlertService.showAlert('Town '+town.data.name+' has been updated', this);
                }, function(error){});
            });
        });


        /**
         * @ngdoc method
         * @name deleteTown
         * @methodOf app.limalinks.admin-ui.controller:TownsController
         * @description
         * Broadcasts deleteTown event
         *
         *
         *
         *

        */

        function deleteTown($event) {
            $rootScope.$broadcast('deleteTown', $event);
        }


        /**
         * @ngdoc event
         * @name deleteTown
         * @methodOf app.limalinks.admin-ui.controller:TownsController
         * @description
         * Binds deleteTown event to action
         *
         *
         *
         *

        */
        $scope.$on('deleteTown', function( ev ){

            $mdDialog.show({
                locals:{selected: vm.selected},
                templateUrl: 'app/limalinks/admin-ui/towns/delete-town-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'DeleteTownDialogController',
                controllerAs: 'vm'
            })
            .then(function(town) {

                //Check all selected towns and delete them by ID
                angular.forEach(vm.selected,function(town){
                    TownService.delete(town)
                     .then(function(res) {
                         vm.towns.splice(vm.towns.indexOf(town),1);
                         vm.selected = [];
                         AlertService.showAlert('Town '+town.name+' has been deleted', this);
                     }, function(error) {
                         console.log(error);
                     });
                 });

            });
        });





    }
})();
