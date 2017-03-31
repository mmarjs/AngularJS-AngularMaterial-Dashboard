(function() {
    'use strict';

    /**
     * @ngdoc directive
     * @name app.limalinks.directive:dynamicModel
     *
     * @description
     * This directive creates a dynamic ngModel
     */

    angular
        .module('app.limalinks')
        .directive('dynamicModel', dynamicModel);

    /* @ngInject */
    function dynamicModel($compile, $parse){
        return {
            restrict: 'A',
            terminal: true,
            priority: 100000,
            link: function (scope, elem) {
                var name = $parse(elem.attr('dynamic-model'))(scope);
                elem.removeAttr('dynamic-model');
                elem.attr('ng-model', name);
                $compile(elem)(scope);
            }
        };




  }

})();
