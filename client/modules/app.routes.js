(function() {
    'use strict';

    angular
	    .module('app')
	    .config(config)
	    .run(function($rootScope, $http, $location, Popup){
	    	$rootScope.popup = {
	    		visible: false,
	    		message: 'Loading...'
	    	};

	    	// Logout function is available in any pages
	    	$rootScope.logout = function(){
	      		Popup.flash('Logged out');
	      		$http.post('/logout');
	      		$location.path('/login');
	    	};
	  	});

	function config($routeProvider, $locationProvider, $httpProvider) {

		//================================================
	    // Check if the user is connected
	    //================================================
	    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
	    	return true; // REMOVE WHEN OUT OF DEV
			// Initialize a new promise
			var deferred = $q.defer();

			// Make an AJAX call to check if the user is logged in
			$http.get('/loggedin').success(function(user){
			// Authenticated
				if (user !== '0')
					$timeout(deferred.resolve, 0);
			// Not Authenticated
				else {
					$rootScope.popup.visible = true;
					$rootScope.popup.message = 'You must be logged in to view this page';
					$timeout(function() {
						$timeout(function(){deferred.reject();}, 0);
						$location.url('/login');
						$rootScope.popup.visible = false;
					}, 1000);
				}
			});
	    	return deferred.promise;
	    };

	    //================================================

	    //================================================
	    // Add an interceptor for AJAX errors
	    //================================================
	    $httpProvider.interceptors.push(function($q, $location) {
			return function(promise) {
				return promise.then(
					// Success: just return the response
					function(response){
						return response;
					}, 
					// Error: check the error status to get only the 401
					function(response) {
					if (response.status === 401)
					  $location.url('/login');
					return $q.reject(response);
					}
	        	);
	      	}
	    });

	    //================================================

	    $routeProvider
	    	.when('/', {
	            templateUrl: 'modules/home/home.html',
	            controller: 'HomeController',
	            controllerAs: 'home',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        .when('/products', {
	            templateUrl: 'modules/products/products.html',
	            controller: 'ProductsController',
	            controllerAs: 'prod',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        .when('/categories', {
	            templateUrl: 'modules/categories/categories.html',
	            controller: 'CategoriesController',
	            controllerAs: 'cat',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        .when('/accounts', {
	            templateUrl: 'modules/accounts/accounts.html',
	            controller: 'AccountsController',
	            controllerAs: 'acc',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        .when('/groups', {
	            templateUrl: 'modules/groups/groups.html',
	            controller: 'GroupsController',
	            controllerAs: 'groups',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        .when('/login', {
	            templateUrl: 'modules/login/login.html',
	            controller: 'LoginController',
	            controllerAs: 'login'
	        });

	    $locationProvider.html5Mode(true);
	}
})();