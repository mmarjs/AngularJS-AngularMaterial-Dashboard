(function() {
    'use strict';

    angular
        .module('app.limalinks.advertiser-ui')
        .controller('AdvertiserUIController', AdvertiserUIController);

    /* @ngInject */
    function AdvertiserUIController() {
        var vm = this;
        vm.testData = ['triangular', 'is', 'great'];
    }
})();
