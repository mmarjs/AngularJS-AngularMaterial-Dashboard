(function () {
  'use strict';
  angular
      .module('app.limalinks.admin-ui')
      .controller('ReferenceSelectorController', ReferenceSelectorController);

  function ReferenceSelectorController ($timeout, $q, ReferenceService) {
    var vm = this;

    vm.readonly = false;
    vm.selectedItem = null;
    vm.searchText = null;
    vm.querySearch = querySearch;
    vm.objects = [];
    vm.object_refs = [];
    vm.selectedObjects = [];
    vm.transformChip = transformChip;
    vm.loadReferences = loadReferences;
    vm.activate = activate;

    vm.activate();


    /**
     * @ngdoc method
     * @name activate
     * @methodOf app.limalinks.admin-ui.controller:ReferenceSelectorController
     * @description
     * This is the initialisation method for the controller and it executes all functions that are needed when bootstrapping the view
     *
     *
     *

    */

    function activate() {
        vm.loadReferences();
    }


    /**
     * Return the proper object when the append is called.
     */
    function transformChip(chip) {
      // If it is an object, it's already a known chip

      if (angular.isObject(chip)) {
        console.log(chip);

        return chip;


      }

      // Otherwise, create a new one
      return { name: chip, type: 'new' }
    }

    /**
     * Search for crops.
     */
    function querySearch (query, type) {

      vm.objects = vm[type];
      vm.objects = vm.objects.map(function (object) {
        object._lowername = object.name.toLowerCase();
        return object;
      });

      var results = query ? vm.objects.filter(createFilterFor(query)) : [];
      return results;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(object) {

        return (object._lowername.indexOf(lowercaseQuery) === 0)
      };

    }

    function loadReferences() {
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
        },
        function(error){

        }
      )
    }
  }
})();
