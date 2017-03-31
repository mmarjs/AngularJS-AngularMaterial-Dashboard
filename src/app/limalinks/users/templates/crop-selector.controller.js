(function () {
  'use strict';
  angular
      .module('app.limalinks.users')
      .controller('CropSelectorCtrl', CropSelectorCtrl);

  function CropSelectorCtrl ($timeout, $q, CropService) {
    var self = this;

    self.readonly = false;
    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;
    self.crops = [];
    self.selectedCrops = [];
    self.transformChip = transformChip;
    self.loadCrops = loadCrops;

    self.loadCrops();

    /**
     * Return the proper object when the append is called.
     */
    function transformChip(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {


        return chip;


      }

      // Otherwise, create a new one
      return { name: chip, type: 'new' }
    }

    /**
     * Search for crops.
     */
    function querySearch (query) {

      var results = query ? self.crops.filter(createFilterFor(query)) : [];
      return results;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(crop) {

        return (crop._lowername.indexOf(lowercaseQuery) === 0)
      };

    }

    function loadCrops() {
      self.resource = CropService.query({});

      self.resource.then(
        function(res){
          var crops = res.data.data;

          self.crops = crops.map(function (crop) {
            crop._lowername = crop.name.toLowerCase();
            return crop;
          });
        },
        function(error){
          //handle error
        }
      );
    }
  }
})();
