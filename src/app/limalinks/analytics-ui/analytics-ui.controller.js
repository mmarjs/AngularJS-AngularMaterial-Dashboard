(function() {
    'use strict';

    angular
        .module('app.limalinks.analytics-ui')
        .controller('EmbeddedAnalyticsController', EmbeddedAnalyticsController);

    /* @ngInject */
    function EmbeddedAnalyticsController($scope, $rootScope, $mdDialog, $mdToast, $filter, AnalyticsService, AdminUIService, UsersService) {
        var vm = this;
        var selected = [];
        var data = [];
        vm.dateRange = {
            start: moment().startOf('week'),
            end: moment().endOf('week')
        };
        console.log(vm.dateRange.start.unix());
        vm.changeDate = changeDate;
        vm.data = data;
        vm.query = {
            ids: '14424903098089083366,14539849952077025766',
            start_date: 1483249828000,
            end_date: 1489643428000
                // start_date: vm.dateRange.start.unix(),
                // end_date: vm.dateRange.end.unix()
        };

        vm.viewChart = viewChart;
        vm.AdminUIService = AdminUIService;
        vm.UsersService = UsersService;
        if (UsersService.seldata) {
            selected = UsersService.seldata;
        }
        if (AdminUIService.seldata) {
            selected = AdminUIService.seldata;
        }

        function viewChart($event) {
            $rootScope.$broadcast('viewChart', $event);
        }
        // selected = AdminUIService.seldata;

        /**
          * @ngdoc event
          * @name viewChart
          * @methodOf app.limalinks.admin-ui.controller:AdminUIController
          * @description
          * Binds viewChart event to action
          *
          *

         */
        $scope.$on('viewChart', function(ev) {
            vm.query.ids = '';
            console.log(selected);
            for (var i = 0; i < selected.length; i++) {
                console.log(selected.length);
                if (i == selected.length - 1) {
                    vm.query.ids = vm.query.ids + selected[i].id;
                } else {
                    vm.query.ids = vm.query.ids + selected[i].id + ',';
                }
            }
            // selected = [];
            generateData();
            // console.log(vm.chartData);
            console.log(vm.query.ids);
        });



        function changeDate($event) {
            $rootScope.$broadcast('salesChangeDate', $event);
        }

        $scope.$on('salesChangeDate', function(event, $event) {
            $mdDialog.show({
                    controller: 'DateChangeDialogController',
                    controllerAs: 'vm',
                    templateUrl: 'app/limalinks/analytics-ui/date-change-dialog.tmpl.html',
                    locals: {
                        range: vm.dateRange
                    },
                    targetEvent: $event
                })
                .then(function() {
                    // create new data
                    // generateMultiLineData();

                    vm.resource = AnalyticsService.query(vm.query, "state");

                    vm.resource.then(
                        function(res) {
                            console.log(res.data.data);
                        },
                        function(error) {

                        }
                    )
                    console.log(vm.dateRange);
                    // pop a toast
                    $mdToast.show(
                        $mdToast.simple()
                        .content($filter('triTranslate')('Date Range Updated'))
                        .position('bottom right')
                        .hideDelay(2000)
                    );
                });
        });



        vm.chartOptions = {
            chart: {
                type: 'multiBarChart',
                height: 450,
                margin: {
                    top: 30,
                    right: 60,
                    bottom: 50,
                    left: 70
                },
                color: d3.scale.category10().range(),
                //useInteractiveGuideline: true,
                duration: 500,
                xAxis: {
                    axisLabel: "Agents"
                },
                yAxis1: {
                    tickFormat: function(d) {
                        return d3.format(',.1f')(d);
                    }
                },
                yAxis2: {
                    tickFormat: function(d) {
                        return d3.format(',.1f')(d);
                    }
                }
            }
        };

        vm.chartData = generateData();

        function generateData() {
            AnalyticsService.query(vm.query, "state")
                .then(function(res) {
                    vm.data = res.data.data;
                    console.log(selected);
                    if (vm.data.length > 0) {
                        console.log(vm.data);
                        var Ddata = [];
                        var SData = [];
                        for (var i = 0; i < vm.data.length; i++) {
                            var name = '';
                            for (var j = 0; j < selected.length; j++) {
                                if (selected[j].id == vm.data[i].agent_ref) {
                                    name = selected[j].first_name;
                                    console.log(name);
                                }
                            }
                            if (vm.data[i].DS) {
                                Ddata.push({
                                    "x": name,
                                    "y": vm.data[i].DS,
                                    "series": 0,
                                    "key": "Dummy Sales"
                                });
                            }
                            if (vm.data[i].S) {
                                SData.push({
                                    "x": name,
                                    "y": vm.data[i].S,
                                    "series": 1,
                                    "key": "Sales"
                                });
                            }
                        }
                        // vm.data = [];
                        var tdata = [];
                        tdata.push({
                            "key": "Dummy Sales",
                            "values": Ddata,
                            "type": "area",
                            "yAxis": 1
                        });
                        tdata.push({
                            "key": "Sales",
                            "values": SData,
                            "type": "area",
                            "yAxis": 1
                        });
                        vm.chartData = tdata;
                        console.log(vm.chartData);
                        // return tdata;
                    }
                });

            return vm.ata;
        }
        console.log(vm.chartData);


    }
})();