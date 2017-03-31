(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name app.limalinks.admin-ui.controller:AdminUIController
     *
     * @description
     * This is a controller for the Objects View
     */


    angular
        .module('app.limalinks.admin-ui')
        .controller('AdminUIController', AdminUIController);

    /* @ngInject */
    function AdminUIController($scope, $timeout, $q, AdminUIService, $mdDialog, $rootScope, $mdToast, AlertService, $state, ReferenceService) {

        //Variable Declaration and Initialisation

        var vm = this;
        vm.references = []; //Used for looking up the names of other types of objects like provinces
        vm.objectType = ""; //Used to detect which entity is being viewed
        vm.editData = {}; // Used to send data to Edit Dialog
        vm.columns = []; //Array of master view's columns      
        vm.selected = [];
        vm.query = {
            search: '',
            limit: '10',
            order: 'name',
            page: 1
        };
        vm.filter = {
            options: {
                debounce: 500
            }
        };

        AdminUIService.seldata = vm.selected;


        //Controller's API

        vm.activate = activate;
        vm.addObject = addObject;
        vm.createColumns = createColumns;
        vm.deleteObject = deleteObject;
        vm.editObject = editObject;
        vm.getObjects = getObjects;
        vm.getObjectType = getObjectType;
        vm.makeStringReference = makeStringReference;
        vm.getReferences = getReferences;
        vm.removeFilter = removeFilter;

        activate();

        ////////////////

        /**
         * @ngdoc method
         * @name getObjectType
         * @methodOf app.limalinks.admin-ui.controller:AdminUIController
         * @description
         * This method detects the type entity being accessed from the application's current state. The controller can them provide specific functionality for the current entity
         *
         *
         *

        */

        function getObjectType() {
            var state = $state;
            var current = state.current.name;
            var objectType = current.substring(current.indexOf("-") + 1, current.length);



            switch (objectType) {
                case "provinces":
                    vm.objectType = "Province";
                    break;
                case "districts":
                    vm.objectType = "District";
                    break;
                case "towns":
                    vm.objectType = "Town";
                    break;
                case "wards":
                    vm.objectType = "Ward";
                    break;
                case "markets":
                    vm.objectType = "Market";
                    break;
                case "packagings":
                    vm.objectType = "Packaging";
                    break;
                case "crops":
                    vm.objectType = "Crop";
                    break;
                case "inputs":
                    vm.objectType = "Input";
                    break;
                default:
                    console.log("error");
            }

        }



        /**
  			 * @ngdoc method
  			 * @name activate
  			 * @methodOf app.limalinks.admin-ui.controller:AdminUIController
  			 * @description
  			 * This method initialises the view by setting default page and querying data
  			 *
  			 *
         *
         *

  			*/

        function activate() {
            var bookmark;
            $scope.$watch('vm.query.search', function(newValue, oldValue) {

                if (!oldValue) {
                    bookmark = vm.query.page;
                }

                if (newValue !== oldValue) {
                    vm.query.page = 1;
                }

                if (!newValue) {
                    vm.query.page = bookmark;
                }

                vm.getObjectType();

                vm.getReferences();


            });
        }


        /**
  			 * @ngdoc method
  			 * @name createColumns
  			 * @methodOf app.limalinks.admin-ui.controller:AdminUIController
  			 * @description
  			 * This methods creates table columns of master view (table)
  			 *
  			 *
         *
         *

  			*/

        function createColumns() {

            angular.forEach(vm.model, function(config, column) {

                if (config.hasOwnProperty("table_index")) {
                    if (config.type == "LLForeignKey") {
                        vm.columns.push({ name: column, table_index: config.table_index, label: config.label, type: "ref" });
                    } else {
                        vm.columns.push({ name: column, table_index: config.table_index, label: config.label, type: "regular" });
                    }
                }
            });

        }

        /**
  			 * @ngdoc method
  			 * @name getReferences
  			 * @methodOf app.limalinks.admin-ui.controller:AdminUIController
  			 * @description
  			 * Get all references required for the view using the ReferenceService
  			 *
  			 *
         *
         *

  			*/

        function getReferences() {

            vm.referencesResource = ReferenceService.getReferences();
            vm.referencesResource.then(
                function(references) {
                    vm.provinces = references["provinces"];
                    vm.districts = references["districts"];
                    vm.towns = references["towns"];
                    vm.wards = references["wards"];
                    vm.markets = references["markets"];
                    vm.packagings = references["packagings"];
                    vm.crops = references["crops"];
                    vm.getObjects();





                },
                function(error) {

                }
            )

        }



        /**
         * @ngdoc method
         * @name removeFilter
         * @methodOf app.limalinks.admin-ui.controller:AdminUIController
         * @description
         * This method removes filters and returns view to initial state
         *
         *

        */

        function removeFilter() {
            vm.filter.show = false;
            vm.query.search = '';

            if (vm.filter.form.$dirty) {
                vm.filter.form.$setPristine();
            }
        }

        /**
         * @ngdoc method
         * @name getObjects
         * @methodOf app.limalinks.admin-ui.controller:AdminUIController
         * @description
         * Queries API for view data
         *
         *

        */

        function getObjects() {
            vm.resource = AdminUIService.query(vm.query, "state");

            vm.resource.then(
                function(res) {
                    var objects = res.data;
                    //vm.objects = objects.data;

                    vm.model = objects.model;
                    vm.makeStringReference(vm.model, objects.data).then(
                        function(data) {
                            vm.objects = data;
                        }
                    )
                    vm.createColumns();
                    vm.editData.model = objects.model;
                    vm.editData.model.objectType = vm.objectType; //Tell the generic user controller what type of model this is for naming purposes and configuration

                    vm.total_count = objects.total_count;
                },
                function(error) {
                    //handle error
                }
            );
        }


        /**
         * @ngdoc method
         * @name makeStringReference
         * @methodOf app.limalinks.admin-ui.controller:AdminUIController
         * @description
         * Replaces ID reference from API with string reference e.g. Name that is user friendly
         *
         *

        */

        function makeStringReference(model, data) {
            return $q(function(resolve, reject) {
                var columnName = "";
                angular.forEach(vm.model, function(config, column) {
                    if (config.hasOwnProperty("table_index")) {
                        if (config.type == "LLForeignKey") {
                            var columnName = column;

                            var objectType = config.data_source.substring(4, config.data_source.length - 1);

                            switch (objectType) {
                                case "provinces":

                                    angular.forEach(vm.provinces, function(province) {
                                        angular.forEach(data, function(object) {
                                            if (object[columnName] == province.id) {
                                                object[columnName + "_string"] = province.name;
                                            }

                                        })
                                    });
                                    break;
                                case "districts":
                                    angular.forEach(vm.districts, function(district) {
                                        angular.forEach(data, function(object) {
                                            if (object[columnName] == district.id) {
                                                object[columnName + "_string"] = district.name;
                                            }

                                        })
                                    });

                                    break;
                                case "towns":
                                    angular.forEach(vm.towns, function(town) {
                                        angular.forEach(data, function(object) {
                                            if (object[columnName] == town.id) {
                                                object[columnName + "_string"] = town.name;
                                            }

                                        })
                                    });
                                    break;
                                case "wards":
                                    angular.forEach(vm.wards, function(ward) {
                                        angular.forEach(data, function(object) {
                                            if (object[columnName] == ward.id) {
                                                object[columnName + "_string"] = ward.name;
                                            }

                                        })
                                    });
                                    break;
                                case "markets":
                                    angular.forEach(vm.markets, function(market) {
                                        angular.forEach(data, function(object) {
                                            if (object[columnName] == market.id) {
                                                object[columnName + "_string"] = market.name;
                                            }

                                        })
                                    });
                                    break;
                                case "packagings":
                                    angular.forEach(vm.packagings, function(packaging) {
                                        angular.forEach(data, function(object) {
                                            if (object[columnName] == packaging.id) {
                                                object[columnName + "_string"] = packaging.name;
                                            }

                                        })
                                    });
                                    break;
                                case "crops":
                                    angular.forEach(vm.crops, function(crop) {
                                        angular.forEach(data, function(object) {
                                            if (object[columnName] == crop.id) {
                                                object[columnName + "_string"] = crop.name;
                                            }

                                        })
                                    });
                                    break;
                                default:
                                    console.log("error");
                            }

                        } else {

                        }

                    }
                });

                resolve(data);


            });
        }



        /**
         * @ngdoc method
         * @name addObject
         * @methodOf app.limalinks.admin-ui.controller:AdminUIController
         * @description
         * Boardcasts addObject event
         *
         *

        */

        function addObject($event) {
            $rootScope.$broadcast('addObject', $event);
        }

        /**
         * @ngdoc event
         * @name addObject
         * @methodOf app.limalinks.admin-ui.controller:AdminUIController
         * @description
         * Binds addObject event to action
         *
         *

        */

        $scope.$on('addObject', function(ev) {
            console.log("werwerwew");
            vm.editData.mode = "add";
            $mdDialog.show({
                    locals: { data: vm.editData },
                    templateUrl: 'app/limalinks/admin-ui/add-object-dialog.tmpl.html',
                    targetEvent: ev,
                    controller: 'AddObjectDialogController',
                    controllerAs: 'vm'
                })
                .then(function(newObject) {

                    vm.resource = AdminUIService.save(newObject, "state");
                    vm.resource.then(function(res) {
                        var object = res.data;
                        vm.objects.push(object.data);
                        vm.makeStringReference(vm.model, vm.objects);
                        AlertService.showAlert(object.data.name + ' has been added', this);
                    }, function(error) {});
                });
        });

        /**
         * @ngdoc method
         * @name editObject
         * @methodOf app.limalinks.admin-ui.controller:AdminUIController
         * @description
         * Boardcasts editObject event
         *
         *

        */

        function editObject($event) {
            // console.log(vm.selected.name);
            $rootScope.$broadcast('editObject', $event);
        }

        /**
         * @ngdoc event
         * @name editObject
         * @methodOf app.limalinks.admin-ui.controller:AdminUIController
         * @description
         * Binds editObject event to action
         *
         *

        */

        $scope.$on('editObject', function(ev) {

            vm.editData.selected = vm.selected;
            vm.editData.mode = "edit";
            $mdDialog.show({
                    locals: { data: vm.editData },
                    templateUrl: 'app/limalinks/admin-ui/add-object-dialog.tmpl.html',
                    targetEvent: ev,
                    controller: 'AddObjectDialogController',
                    controllerAs: 'vm'
                })
                .then(function(newObject) {
                    vm.resource = AdminUIService.update(newObject, "state");
                    vm.resource.then(function(res) {
                        var object = res.data;
                        vm.objects[vm.objects.indexOf(newObject)] = object.data;
                        vm.selected = [];
                        /*$mdToast.show({
                            template:  '<md-toast><span flex>'+object.data.name+' has been updated</span></md-toast>',
                            position: 'bottom right',
                            hideDelay: 3000,
                            parent: this
                        });*/

                        AlertService.showAlert(object.data.name + ' has been updated', this);
                    }, function(error) {});
                });
        });

        /**
         * @ngdoc method
         * @name deleteObject
         * @methodOf app.limalinks.admin-ui.controller:AdminUIController
         * @description
         * Broadcasts deleteObject event
         *
         *

        */

        function deleteObject($event) {
            $rootScope.$broadcast('deleteObject', $event);
        }


        /**
         * @ngdoc event
         * @name deleteObject
         * @methodOf app.limalinks.admin-ui.controller:AdminUIController
         * @description
         * Binds deleteObject event to action
         *
         *

        */
        $scope.$on('deleteObject', function(ev) {
            vm.editData.selected = vm.selected;
            $mdDialog.show({
                    locals: { data: vm.editData },
                    templateUrl: 'app/limalinks/admin-ui/delete-object-dialog.tmpl.html',
                    targetEvent: ev,
                    controller: 'DeleteObjectDialogController',
                    controllerAs: 'vm'
                })
                .then(function(object) {

                    //Check all selected objects and delete them by ID
                    angular.forEach(vm.selected, function(object) {
                        AdminUIService.delete(object, "state")
                            .then(function(res) {
                                vm.objects.splice(vm.objects.indexOf(object), 1);
                                vm.selected = [];
                                AlertService.showAlert(object.name + ' has been deleted', this);
                            }, function(error) {
                                console.log(error);
                            });
                    });

                });
        });



        /**
         * @ngdoc method
         * @name viewChart
         * @methodOf app.limalinks.admin-ui.controller:AdminUIController
         * @description
         * Boardcasts viewChart event
         *
         *

        */
    }
})();