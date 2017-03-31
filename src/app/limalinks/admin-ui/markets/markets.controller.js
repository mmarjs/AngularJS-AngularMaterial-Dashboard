
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name app.limalinks.admin-ui.controller:MarketsController
     *
     * @description
     * This is a controller for the Markets View
     */


    angular
        .module('app.limalinks.admin-ui')
        .controller('MarketsController', MarketsController);

    /* @ngInject */
    function MarketsController($scope, $timeout, $q, MarketService, $mdDialog, $rootScope, AlertService) {

        var vm = this;

        //Controller's API

        vm.activate = activate;
        vm.addMarket = addMarket;
        vm.deleteMarket = deleteMarket;
        vm.editMarket = editMarket;
        vm.getMarkets = getMarkets;
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
            name: 'Market Name',
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
  			 * @methodOf app.limalinks.admin-ui.controller:MarketsController
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

                vm.getMarkets();

            });
        }



        /**
         * @ngdoc method
         * @name removeFilter
         * @methodOf app.limalinks.admin-ui.controller:MarketsController
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
         * @name getMarkets
         * @methodOf app.limalinks.admin-ui.controller:MarketsController
         * @description
         * Queries API for view data
         *
         *
         *
         *

        */

        function getMarkets() {
            vm.resource = MarketService.query(vm.query);

            vm.resource.then(
              function(res){
                var markets = res.data;
                vm.markets = markets.data;
                vm.total_count = markets.total_count;
              },
              function(error){
                //handle error
              }
            );
        }





        /**
         * @ngdoc method
         * @name addMarket
         * @methodOf app.limalinks.admin-ui.controller:MarketsController
         * @description
         * Boardcasts addMarket event
         *
         *
         *
         *

        */

        function addMarket($event) {
            $rootScope.$broadcast('addMarket', $event);
        }

        /**
         * @ngdoc event
         * @name addMarket
         * @methodOf app.limalinks.admin-ui.controller:MarketsController
         * @description
         * Binds addMarket event to action
         *
         *
         *
         *

        */

        $scope.$on('addMarket', function( ev ){
            console.log("SHowing Modal");
            $mdDialog.show({
                templateUrl: 'app/limalinks/admin-ui/markets/add-market-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'AddMarketDialogController',
                controllerAs: 'vm'
            })
            .then(function(newMarket) {

                MarketService.save(newMarket)
                .then(function(res){
                  var market = res.data;
                  vm.markets.push(market.data);
                  AlertService.showAlert('Market '+market.data.name+' has been added', this);
                }, function(error){});
            });
        });

        /**
         * @ngdoc method
         * @name editMarket
         * @methodOf app.limalinks.admin-ui.controller:MarketsController
         * @description
         * Boardcasts editMarket event
         *
         *
         *
         *

        */

        function editMarket($event) {
            $rootScope.$broadcast('editMarket', $event);
        }

        /**
         * @ngdoc event
         * @name editMarket
         * @methodOf app.limalinks.admin-ui.controller:MarketsController
         * @description
         * Binds editMarket event to action
         *
         *
         *
         *

        */

        $scope.$on('editMarket', function( ev ){

            $mdDialog.show({
                locals:{selected: vm.selected},
                templateUrl: 'app/limalinks/admin-ui/markets/edit-market-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'EditMarketDialogController',
                controllerAs: 'vm'
            })
            .then(function(newMarket) {
                vm.resource = MarketService.update(newMarket);
                vm.resource.then(function(res){
                  var market = res.data;
                  vm.markets[vm.markets.indexOf(newMarket)] = market.data;
                  vm.selected = [];
                  AlertService.showAlert('Market '+market.data.name+' has been updated', this);
                }, function(error){});
            });
        });


        /**
         * @ngdoc method
         * @name deleteMarket
         * @methodOf app.limalinks.admin-ui.controller:MarketsController
         * @description
         * Broadcasts deleteMarket event
         *
         *
         *
         *

        */

        function deleteMarket($event) {
            $rootScope.$broadcast('deleteMarket', $event);
        }


        /**
         * @ngdoc event
         * @name deleteMarket
         * @methodOf app.limalinks.admin-ui.controller:MarketsController
         * @description
         * Binds deleteMarket event to action
         *
         *
         *
         *

        */
        $scope.$on('deleteMarket', function( ev ){

            $mdDialog.show({
                locals:{selected: vm.selected},
                templateUrl: 'app/limalinks/admin-ui/markets/delete-market-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'DeleteMarketDialogController',
                controllerAs: 'vm'
            })
            .then(function(market) {

                //Check all selected markets and delete them by ID
                angular.forEach(vm.selected,function(market){
                    MarketService.delete(market)
                     .then(function(res) {
                         vm.markets.splice(vm.markets.indexOf(market),1);
                         vm.selected = [];
                         AlertService.showAlert('Market '+market.name+' has been added', this);
                     }, function(error) {
                         console.log(error);
                     });
                 });

            });
        });









    }
})();
