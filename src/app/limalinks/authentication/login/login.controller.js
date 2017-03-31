(function() {
    'use strict';

    angular
        .module('app.limalinks.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($state, triSettings, AuthService) {
        var vm = this;
        vm.loginClick = loginClick;

        vm.triSettings = triSettings;
        // create blank user variable for login form
        vm.user = {
            email: '',
            password: ''
        };

        ////////////////

        function loginClick() {
            //$state.go('triangular.dashboard');
            var credentials = {
              username: vm.user.username,
              password:vm.user.password
            }
            // if(AuthService.logIn(credentials)){
            //   $state.go('triangular.admin-crops');
            // }
            AuthService.logIn(credentials, function(result){
              console.info("login result", result);
              if(result==true){
                $state.go('triangular.admin-crops');
              }
              else {
                vm.loginFailed = true;
                vm.errorMessage = "Login failed. Please try again.";
              }
            });


        }
    }
})();
