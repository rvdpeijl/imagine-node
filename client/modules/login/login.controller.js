(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['Auth', 'Popup', '$location', '$rootScope', 'Permissions'];
    function LoginController(Auth, Popup, $location, $rootScope, Permissions) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'LoginController';

        resetCredentials();

        function resetCredentials() {
        	vm.credentials = {
	        	username: '',
	        	password: ''
	        };
        }

        vm.attemptLogin = function(credentials) {
        	Popup.show('Attempting login');
        	// Attempt login
        	Auth.attemptLogin(credentials).then(function(data) {
        		if (data.error) {
        			Popup.flash(data.message);
                    $rootScope.loggedin = true;
        			resetCredentials();
        		} else {
                    Popup.flash('Login succesful');
                    $location.path('/');
        		}
        	});
        }
    }
})();