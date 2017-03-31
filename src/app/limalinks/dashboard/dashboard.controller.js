(function() {
    'use strict';

    angular
        .module('app.limalinks.dashboard')
        .controller('DashboardController', DashboardController);

    /* @ngInject */
    function DashboardController() {
        var vm = this;
        vm.testData = ['triangular', 'is', 'great'];
    }
})();
