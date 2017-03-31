(function () {
  'use strict';
  angular
      .module('app.limalinks.users')
      .controller('AgentSelectorCtrl', AgentSelectorCtrl);

  function AgentSelectorCtrl ($timeout, $q, UsersService, ChipService) {
    var self = this;

    self.readonly = false;
    self.selectedItem = null;
    self.searchText = null;

    self.agents = [];
    self.selectedAgents = [];
    self.querySearch = querySearch;
    self.transformChip = transformChip;
    self.loadAgents = loadAgents;
    self.createFilterFor = createFilterFor;

    self.loadAgents();

    /**
     * Return the proper object when the append is called.
     */
    function transformChip(chip) {

      ChipService.transformChip(chip);
    }

    /**
     * Search for agents.
     */
    function querySearch (query) {


      return ChipService.querySearch(query, self.agents);
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {

      return ChipService.createFilterFor(query);
    }

    function loadAgents() {
      ChipService.loadData(UsersService, function(data){
        self.agents = data;
      });
    }
  }
})();
