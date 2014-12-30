(function() {
    'use strict';

    angular
	    .module('app')
	    .config(config);

	function config($routeProvider, $locationProvider) {
	    $routeProvider
	    	.when('/', {
	            templateUrl: 'modules/home/home.html',
	            controller: 'HomeController',
	            controllerAs: 'home'
	        })
	        .when('/products', {
	            templateUrl: 'modules/products/products.html',
	            controller: 'ProductsController',
	            controllerAs: 'prod'
	        });

	    $locationProvider.html5Mode(true);
	}
})();