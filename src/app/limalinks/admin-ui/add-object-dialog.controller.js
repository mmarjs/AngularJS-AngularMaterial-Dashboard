(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name app.limalinks.admin-ui.controller:AddObjectDialogController
     *
     * @description
     * This is a controller for the dialog for adding Objects
     */

    angular
        .module('app.limalinks.admin-ui')
        .controller('AddObjectDialogController', AddObjectDialogController);

    /* @ngInject */
    function AddObjectDialogController($q, $state, $mdDialog, DistrictService, TownService, WardService, MarketService, $scope, data, ReferenceService, AdminUIService, AlertService) {
        var vm = this;
        vm.editMode = false;
        vm.references = []; //Used for looking up the names of other types of objects like provinces
        vm.childSets = []; //Used for displaying childsets to user
        vm.childSetHeadings = []; //Used for displaying childsets to user
        vm.inputs = [];
        vm.selects = [];
        vm.dateControls = [];
        vm.predefinedSelects = [];
        vm.fields = [];
        vm.model = data.model;
        vm.selected = data.selected;
        vm.mode = data.mode;
        vm.object = {}; //View's scope object
        vm.object_refs = [];


        //Controller's API
        vm.activate = activate;
        vm.cancel = cancel;
        vm.createDetailFields = createDetailFields;
        vm.createFields = createFields;
        vm.getReferences = getReferences;
        vm.generateChildrenSets = generateChildrenSets;
        vm.hide = hide;
        vm.setReference = setReference;
        vm.initAddOrEditMode = initAddOrEditMode;



        vm.activate();

        /////////////////////////

        /**
         * @ngdoc method
         * @name createFields
         * @methodOf app.limalinks.admin-ui.controller:AddObjectDialogController
         * @description
         * This method traverses the model information received from the API and generates the UI controls for the dialog in add or edit mode
         *
         *
         *

        */

        function createFields() {

          return $q(function(resolve, reject) {

                angular.forEach(vm.model, function(config, column){


                  //Debug
                  if(column == "type"){
                    console.log(config);
                  }
                  if(config.hasOwnProperty("editor_index")){

                    if(config.type == "LLForeignKey"){
                      var refs = [];
                      var ref_model = "";
                      var objectType = config.data_source.substring(4, config.data_source.length-2);

                      switch(objectType) {
                          case "province":
                              refs = vm.provinces;
                              break;
                          case "district":
                              refs = vm.districts;
                              break;
                          case "town":
                              refs = vm.towns;
                              break;
                          case "ward":
                              refs = vm.wards;
                              break;
                          case "market":
                              refs = vm.markets;
                              break;
                          case "packagings":
                              refs = vm.packagings;
                              break;
                          case "crop":
                              refs = vm.crops;
                              break;
                          case "advertiser":
                              refs = vm.advertisers;
                              console.log(refs);
                              break;

                          default:
                              console.log("error");
                      }




                      vm.selects.push({name: column, editor_index:config.editor_index, label: config.label, required: config.required?"true":"false", maxlength:config.max_length, refs: refs});

                      //If we are in edit mode set the value of the selected reference, so that the name is visible to the user
                      if(vm.selected && vm.selected.length == 1){
                          angular.forEach(vm.selects, function(select){
                            vm.object.ref=vm.object[select.name]; //temporal fix. It will be a problem when there are multiple reference types. Find a fix to allow dynamic ng-model
                          })
                      }


                    }
                    else if (config.hasOwnProperty("choices")){
                      var refs = config.choices;

                      angular.forEach(refs, function(ref){
                        ref = ref.reduce(function(acc, cur, i) {

                          acc[i] = cur;
                          return acc;
                        }, {});
                        console.log(ref);
                      });
                      console.log(config.choices);
                      vm.predefinedSelects.push({name: column, editor_index:config.editor_index, label: config.label, required: config.required?"true":"false", maxlength:config.max_length, refs: refs});

                    }
                    else if (config.type == "DateTimeField") {
                      if(vm.mode=="edit"){
                        console.log(vm.object[column]);
                        vm.object[column] = new Date(vm.object[column]);
                        console.log(vm.object[column]);
                      }
                      vm.dateControls.push({name: column, editor_index:config.editor_index, label: config.label, required: config.required?"true":"false", maxlength:config.max_length});
                    }
                    else {
                      vm.inputs.push({name: column, editor_index:config.editor_index, label: config.label, required: config.required?"true":"false", maxlength:config.max_length});
                    }

                  }
                });

                resolve (vm);
            });

        }


        /**
         * @ngdoc method
         * @name createDetailFields
         * @methodOf app.limalinks.admin-ui.controller:AddObjectDialogController
         * @description
         * This method traverses the model information received from the API and generates the information to display on the dialog in view mode
         *
         *
         *

        */

        function createDetailFields() {

          return $q(function(resolve, reject) {

                angular.forEach(vm.model, function(config, column){

                  if(config.hasOwnProperty("detail_index")){

                    if(config.type == "LLForeignKey"){
                      var refs = [];
                      var ref_model = "";
                      var objectType = config.data_source.substring(4, config.data_source.length-2);

                      switch(objectType) {
                          case "province":
                              refs = vm.provinces;
                              break;
                          case "district":
                              refs = vm.districts;
                              break;
                          case "town":
                              refs = vm.towns;
                              break;
                          case "ward":
                              refs = vm.wards;
                              break;
                          case "market":
                              refs = vm.markets;
                              break;
                          case "packaging":
                              refs = vm.packagings;
                              break;
                          case "crop":
                              refs = vm.crops;
                              break;
                          default:
                              console.log("error");
                      }
                      vm.fields.push({type: config.type, name: column, detail_index:config.detail_index, label: config.label, required: config.required?"true":"false", maxlength:config.max_length, refs: refs});
                    }
                    else {
                      vm.fields.push({type: config.type,name: column, detail_index:config.detail_index, label: config.label, required: config.required?"true":"false", maxlength:config.max_length});
                    }

                  }
                });

                resolve (vm);
            });

        }


        /**
         * @ngdoc method
         * @name setReference
         * @methodOf app.limalinks.admin-ui.controller:AddObjectDialogController
         * @description
         * This method sets the reference on the model because ng-model does not provide the ability to be dynamically updated
         *
         *
         *

        */

        function setReference (select){
          vm.object[select.name] = vm.object.ref;
          console.log(select);

        }


        /**
         * @ngdoc method
         * @name generateChildrenSets
         * @methodOf app.limalinks.admin-ui.controller:AddObjectDialogController
         * @description
         * This method goes through the set fields and matches them with the references arrays to display user friendly lists to the user
         *
         *
         *

        */

        function generateChildrenSets (){
          for(var field in vm.object){
            if(field.substring(field.indexOf("_")+1, field.length) == "set"){
              var index = field.substring(0, field.indexOf("_"))+"s";
              vm.childSetHeadings.push(index);
              var childrenArray = vm[index];
              var children = []; // storing this object's actual children
              angular.forEach(childrenArray, function(child){
                if(child[vm.model.objectType.toLowerCase()+"_ref"]==vm.object.id){
                  children.push(child);


                }
              });

              vm.childSets.push(children);
              vm.object[field] = children;

            }

          }
          console.log(vm.childSets);

        }


        /**
         * @ngdoc method
         * @name activate
         * @methodOf app.limalinks.admin-ui.controller:AddObjectDialogController
         * @description
         * This is the initialisation method for the controller and it executes all functions that are needed when bootstrapping the view
         *
         *
         *

        */

        function activate() {
            vm.initAddOrEditMode();
            vm.createDetailFields();
            vm.getReferences();







        }

        /**
         * @ngdoc method
         * @name getReferences
         * @methodOf app.limalinks.admin-ui.controller:AddObjectDialogController
         * @description
         * This method initialises the references for the view from other entities e.g. provinces, districts etc
         *
         *
         *

        */

        function getReferences() {
            vm.resource = ReferenceService.getReferences();
            vm.resource.then(
              function(references){
                vm.provinces = references["provinces"];
                vm.districts = references["districts"];
                vm.towns = references["towns"];
                vm.wards = references["wards"];
                vm.markets = references["markets"];
                vm.packagings = references["packagings"];
                vm.crops = references["crops"];
                vm.advertisers = references["advertisers"];
                generateChildrenSets();

                vm.controlsResource = vm.createFields();
                vm.controlsResource.then(
                  function(){
                    console.log("showing modal");
                  },
                  function(){}
                );



              },
              function(error){

              }
            )




        }

        /**
         * @ngdoc method
         * @name initAddOrEditMode
         * @methodOf app.limalinks.admin-ui.controller:AddObjectDialogController
         * @description
         * This method sets the mode to add or edit when the view initialises. It also sets the scope object
         *
         *
         *

        */

        function initAddOrEditMode(){

          //If an item has been selected, then we are in edit mode and we must bind the fields of the view the selected object
          console.log(vm.mode);
          if(vm.mode == "edit"){
            vm.object = vm.selected[0];

          }
          else {
            vm.object = {};
            vm.selected = [];
            vm.editMode = true;
          }
        }

        /**
         * @ngdoc method
         * @name toggleMode
         * @methodOf app.limalinks.admin-ui.controller:AddObjectDialogController
         * @description
         * This method switches the views mode between add and edit mode
         *
         *
         *

        */

        function toggleMode(){
          if(vm.editMode){
            vm.editMode = false;
          }
          else {
            vm.editMode = true;
          }
        }

        /**
         * @ngdoc method
         * @name hide
         * @methodOf app.limalinks.admin-ui.controller:AddObjectDialogController
         * @description
         * This method dismisses the modal and returns the scope object to the calling controller
         *
         *
         *

        */

        function hide() {
          console.log(vm.object);
          //vm.object.valid_to = moment(vm.object.valid_to).unix();
          //vm.object.valid_from = moment(vm.object.valid_from).unix();
          angular.forEach(vm.childSetHeadings, function(heading){
            var index = heading.substring(0, heading.length-1)+"_set";
            var children = vm.object[index];
            angular.forEach(children, function(child){
              if (child.type == "new"){
                child[vm.model.objectType.toLowerCase()+"_ref"] = vm.object.id;
                vm.resource = AdminUIService.save(child, heading);
                vm.resource.then(function(res){
                  var newChild = res.data;
                  AlertService.showAlert(newChild.data.name+' has been added', this);
                }, function(error){});
              }
            });


            vm.object[index] = vm.object[index].map(function(ref){
              ref = ref.id;
              return ref;
            });

          });




          $mdDialog.hide(vm.object);
        }

        /**
         * @ngdoc method
         * @name cancel
         * @methodOf app.limalinks.admin-ui.controller:AddObjectDialogController
         * @description
         * This method dismisses the modal and does not return the scope object to the calling controller
         *
         *
         *

        */

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
