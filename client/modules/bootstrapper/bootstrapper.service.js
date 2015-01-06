(function() {
    'use strict';

    angular
        .module('app')
        .factory('Bootstrapper', Bootstrapper);

    Bootstrapper.$inject = ['$rootScope', '$http', 'Accounts', 'Categories', 'Groups', 'Permissions', 'Products', 'Storage'];
    function Bootstrapper($rootScope, $http, Accounts, Categories, Groups, Permissions, Products, Storage) {
        
        var service = {
            chain: chain,
            products: null,

        };

        var accounts = $http.get('/api/accounts').success(function (data) {
			$rootScope.accounts = data;
	    });

	    var categories = $http.get('/api/categories').success(function (data) {
			$rootScope.categories = data;
	    });

	    var groups = $http.get('/api/groups').success(function (data) {
			$rootScope.groups = data;
	    });

	    var permissions = $http.get('/api/permissions').success(function (data) {
			$rootScope.permissions = data;
	    });

	    var storage = $http.get('/api/storage').success(function (data) {
			$rootScope.storage = data;
	    });

	    var chain = accounts.then(function() {
	    	return categories.then(function(){
	    		return 
	    	});
	    });

        return service;

        ////////////////

        function getProducts() {
        	return service.products;
        }
    }
})();