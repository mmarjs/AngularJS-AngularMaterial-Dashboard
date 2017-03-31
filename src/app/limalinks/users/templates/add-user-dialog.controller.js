(function() {
    'use strict';

    angular
        .module('app.limalinks.users')
        .controller('AddUserDialogController', AddUserDialogController);

    /* @ngInject */
    function AddUserDialogController($state, $mdDialog, DistrictService, TownService, ProvinceService, WardService, MarketService, $scope, model) {
        var vm = this;
        vm.model = model;
        vm.cancel = cancel;
        vm.getProvinces = getProvinces;
        vm.getDistricts = getDistricts;
        vm.getTowns = getTowns;
        vm.getWards = getWards;
        vm.getMarkets = getMarkets;
        vm.activate = activate;
        vm.hide = hide;
        vm.user = {

            crop_refs:[],
            agent_refs:[]

        };




        vm.genders = [
          {
            id: 0,
            name: 'Male',
            abbreviation:'M'
          },
          {
            id: 1,
            name: 'Female',
            abbreviation:'F'
          }
        ];

        vm.activate();

        /////////////////////////

        function activate() {
            console.log("Activated");
            vm.getProvinces();
            vm.getMarkets();
            vm.guardDistrict = false;

            $scope.$watch('vm.user.province_ref', function (newValue, oldValue) {
                if(parseInt(vm.user.province_ref) && !vm.guardDistrict){
                    vm.guardDistrict = false;
                }
                if(!vm.guardDistrict){
                  vm.user.district_ref = undefined;

                  vm.getDistricts();
                }
                else {
                    vm.guardDistrict = false;
                }


            });
            $scope.$watch('vm.user.district_ref', function (newValue, oldValue) {
                vm.getTowns();
                vm.getWards();

                angular.forEach(vm.districts, function(district){
                  if(district.id == vm.user.district_ref){
                    vm.user.province_ref = district.province_ref;
                    vm.guardDistrict = true;
                  }
                })
            });

            $scope.$watch('vm.user.town_ref', function (newValue, oldValue) {

                angular.forEach(vm.towns, function(town){
                  if(town.id == vm.user.town_ref){
                    vm.user.district_ref = town.district_ref;
                    vm.guardTown = true;
                  }
                });

            });
        }

        function getProvinces() {
            vm.resource = ProvinceService.query({});

            vm.resource.then(
              function(res){
                var provinces = res.data;
                vm.provinces = provinces.data;
                console.info("Provinces", vm.provinces);
              },
              function(error){
                //handle error
              }
            );
        }

        function getDistricts() {
            vm.resource = DistrictService.query({province_ref:vm.user.province_ref});

            vm.resource.then(
              function(res){
                var districts = res.data;
                vm.districts = districts.data;
                console.info("Districts", vm.districts);
              },
              function(error){
                //handle error
              }
            );
        }

        function getTowns() {
            vm.resource = TownService.query({district_ref:vm.user.district_ref});

            vm.resource.then(
              function(res){
                var towns = res.data;
                vm.towns = towns.data;
                console.info("Towns", vm.towns);
              },
              function(error){
                //handle error
              }
            );
        }

        function getMarkets() {
            vm.resource = MarketService.query({});

            vm.resource.then(
              function(res){
                var markets = res.data;
                vm.markets = markets.data;

              },
              function(error){
                //handle error
              }
            );
        }

        function getWards() {
            vm.resource = WardService.query({district_ref:vm.user.district_ref});

            vm.resource.then(
              function(res){
                var wards = res.data;
                vm.wards = wards.data;
                console.info("Wards", vm.wards);
              },
              function(error){
                //handle error
              }
            );
        }

        function hide() {
          vm.user.crop_refs = vm.user.crop_refs.map(function(crop) {
            crop = crop.id;
            return crop;
          });

          vm.user.agent_refs = vm.user.agent_refs.map(function(agent) {
            agent = agent.id;
            return agent;
          });
          $mdDialog.hide(vm.user);
        }

        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
