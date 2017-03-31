
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name app.limalinks.users.controller:UsersController
     *
     * @description
     * This is a controller for the Users View
     */


    angular
        .module('app.limalinks.users')
        .controller('UsersController', UsersController);

    /* @ngInject */
    function UsersController($scope, $timeout, $q, UsersService, $mdDialog, $rootScope, AlertService, $state, $mdToast, Papa) {

        var vm = this;
        vm.userType = "";
        vm.editData = {}; // Used to send data to Edit Dialog



        //Controller's API

        vm.activate = activate;
        vm.addUser = addUser;
        vm.deleteUser = deleteUser;
        vm.editUser = editUser;
        vm.getUsers = getUsers;
        vm.removeFilter = removeFilter;
        vm.getUserType = getUserType;
        vm.uploadUsers = uploadUsers;


        vm.query = {
            search: '',
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

        UsersService.seldata = vm.selected;


        vm.filter = {
            options: {
                debounce: 500
            }
        };


        activate();

        ////////////////

        function getUserType(){
          var state = $state;
          var current = state.current.name;
          var userType = current.substring(current.indexOf("-")+1, current.length);



          switch(userType) {
              case "administrators":
                  vm.userType = "Administrator";
                  break;
              case "farmers":
                  vm.userType = "Farmer";
                  break;
              case "agents":
                  vm.userType = "Agent";
                  break;
              case "advertisers":
                  vm.userType = "Advertiser";
                  break;
              case "aggregators":
                  vm.userType = "Aggregator";
                  break;
              case "analytics":
                  vm.userType = "Analytic";
                  break;
              default:
                  console.log("error");
          }

        }


        /**
  			 * @ngdoc method
  			 * @name activate
  			 * @methodOf app.limalinks.users.controller:UsersController
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
                vm.getUserType();
                vm.getUsers();

            });
        }



        /**
         * @ngdoc method
         * @name removeFilter
         * @methodOf app.limalinks.users.controller:UsersController
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
         * @name getUsers
         * @methodOf app.limalinks.users.controller:UsersController
         * @description
         * Queries API for view data
         *
         *
         *
         *

        */

        function getUsers() {

            vm.resource = UsersService.query(vm.query, "state");

            vm.resource.then(
              function(res){
                var users = res.data;
                vm.users = users.data;

                vm.editData.model = users.model;
                vm.editData.model.name = vm.userType; //Tell the generic user controller what type of model this is for naming purposes and configuration
                vm.total_count = users.total_count;
              },
              function(error){
                //handle error
              }
            );
        }

        /**
         * @ngdoc method
         * @name addUser
         * @methodOf app.limalinks.users.controller:UsersController
         * @description
         * Boardcasts addUser event
         *
         *
         *
         *

        */

        function addUser($event) {
            $rootScope.$broadcast('addUser', $event);
        }

        /**
         * @ngdoc event
         * @name addUser
         * @methodOf app.limalinks.users.controller:UsersController
         * @description
         * Binds addUser event to action
         *
         *
         *
         *

        */

        $scope.$on('addUser', function( ev ){

            $mdDialog.show({
                locals:{model: vm.editData.model},
                templateUrl: 'app/limalinks/users/templates/add-user-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'AddUserDialogController',
                controllerAs: 'vm'
            })
            .then(function(newUser) {

                vm.resource = UsersService.save(newUser, "state");
                vm.resource.then(function(res){
                  var user = res.data;
                  console.log(user.data);
                  vm.users.push(user.data);
                  AlertService.showAlert('User '+user.data.first_name+' '+user.data.last_name+' has been added', this);
                }, function(error){});
            });
        });

        /**
         * @ngdoc method
         * @name editUser
         * @methodOf app.limalinks.users.controller:UsersController
         * @description
         * Boardcasts editUser event
         *
         *
         *
         *

        */

        function editUser($event) {
            $rootScope.$broadcast('editUser', $event);
        }

        /**
         * @ngdoc event
         * @name editUser
         * @methodOf app.limalinks.users.controller:UsersController
         * @description
         * Binds editUser event to action
         *
         *
         *
         *

        */

        $scope.$on('editUser', function( ev ){
            vm.editData.selected = vm.selected;
            $mdDialog.show({
                locals:{data: vm.editData},
                templateUrl: 'app/limalinks/users/templates/add-user-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'EditUserDialogController',
                controllerAs: 'vm'
            })
            .then(function(newUser) {
                vm.resource = UsersService.update(newUser, "state");
                vm.resource.then(function(res){
                  var user = res.data;
                  vm.users[vm.users.indexOf(newUser)] = user.data;
                  vm.selected = [];
                  console.log(user.data);
                  AlertService.showAlert('User '+user.data.first_name+' '+user.data.last_name+' has been updated', this);
                }, function(error){});
            });
        });


        /**
         * @ngdoc method
         * @name deleteUser
         * @methodOf app.limalinks.users.controller:UsersController
         * @description
         * Broadcasts deleteUser event
         *
         *
         *
         *

        */

        function deleteUser($event) {
            $rootScope.$broadcast('deleteUser', $event);
        }


        /**
         * @ngdoc event
         * @name deleteUser
         * @methodOf app.limalinks.users.controller:UsersController
         * @description
         * Binds deleteUser event to action
         *
         *
         *
         *

        */
        $scope.$on('deleteUser', function( ev ){

            $mdDialog.show({
                locals:{selected: vm.selected},
                templateUrl: 'app/limalinks/users/templates/delete-user-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'DeleteUserDialogController',
                controllerAs: 'vm'
            })
            .then(function(user) {

                //Check all selected users and delete them by ID
                angular.forEach(vm.selected,function(user){
                    vm.resource = UsersService.delete(user, "state");
                     vm.resource.then(function(res) {
                         vm.users.splice(vm.users.indexOf(user),1);
                         vm.selected = [];
                         AlertService.showAlert('User '+user.first_name+' '+user.last_name+' has been deleted', this);
                     }, function(error) {
                         console.log(error);
                     });
                 });

            });
        });


        function uploadUsers($files) {
            if($files !== null && $files.length > 0) {
                var message = 'Thanks for ';
                for(var file in $files) {
                    message += $files[file].name + ' ';
                    Papa.parse($files[file], {header:true})
                    .then(function(result){
                      return $q(function(resolve, reject) {
                          var count = 0;
                          angular.forEach(result.data, function(user){
                              console.log(user.user_type.toLowerCase());
                              vm.resource = UsersService.save(user, user.user_type.toLowerCase()+"s");
                              vm.resource.then(function(res){
                                var user = res.data;
                                console.log(user.data);
                                vm.users.push(user.data);
                                if (count == result.data.length){
                                  resolve(function(){
                                    AlertService.showAlert(count+' users have been uploaded from '+ $files[file].name, this);
                                  });
                                }
                                count++;
                                //AlertService.showAlert('User '+user.data.first_name+' '+user.data.last_name+' has been added', this);
                              }, function(error){});
                          });
                        });
                    })
                    .catch(function(){})
                    .finally(function(){});
                }

            }
        }





    }
})();
