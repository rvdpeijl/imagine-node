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
	        })
	        .when('/categories', {
	            templateUrl: 'modules/categories/categories.html',
	            controller: 'CategoriesController',
	            controllerAs: 'cat'
	        });

	    $locationProvider.html5Mode(true);
	}
})();