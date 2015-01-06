(function() {
    'use strict';

    angular
	    .module('app')
	    .config(config)
	    .run(function($rootScope, $http, $location, Popup, Products, Categories, Accounts, Permissions, Groups){

	    	$rootScope.popup = {
	    		visible: true,
	    		message: 'Loading application...'
	    	};

	    	Groups.findAll().then(function(response) {
	    		$rootScope.groups = response;

	    		Permissions.findAll().then(function(response) {
		    		$rootScope.permissions = response;
		    		$rootScope.popup = {
			    		visible: false,
			    		message: ''
			    	};
		    	});
	    	});

	    	// Logout function is available in any pages
	    	$rootScope.logout = function(){
	      		Popup.flash('Logged out');
	      		$http.post('/logout');
	      		$location.path('/login');
	      		$rootScope.$broadcast('permissionsChanged');
	      		$rootScope.account = null;
	    	};
	  	});

	function config($stateProvider, $locationProvider, $httpProvider) {

		//================================================
	    // Check if the user is connected
	    //================================================
	    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
			// Initialize a new promise
			var deferred = $q.defer();

			// Make an AJAX call to check if the user is logged in
			$http.get('/loggedin').success(function(account){
			// Authenticated
				if (account !== '0') {
					$rootScope.account = account;
					$timeout(deferred.resolve, 0);
				}
			// Not Authenticated
				else {
					$rootScope.popup.visible = true;
					$rootScope.popup.message = 'You must be logged in to view this page';
					$timeout(function() {
						$timeout(function(){deferred.reject();}, 0);
						$location.url('/login');
						$rootScope.popup.visible = false;
						$rootScope.account = null;
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

	    $stateProvider
	    	/*=================================
	    	=            Dashboard            =
	    	=================================*/	    	
	    	.state('dashboard', {
	    		url: '/',
	    		templateUrl: 'modules/dashboard/dashboard.html',
	            controller: 'DashboardController as dash',
	            resolve: {
	            	loggedin: checkLoggedin,
	            	groups: function(Groups) {
	            		return Groups.findAll();
	            	},
	            	products: function(Products) {
	            		return Products.findAll();
	            	},
	            	categories: function(Categories) {
	            		return Categories.findAll();
	            	},
	            	accounts: function(Accounts) {
	            		return Accounts.findAll();
	            	},
	            	permissions: function(Permissions) {
	            		return Permissions.findAll();
	            	},
	            	storage: function(Storage) {
	            		return Storage.findAll();
	            	}
	            }
	        })
	        /*================================
	        =            Products            =
	        ================================*/
	        .state('products', {
	        	url: '/products',
	        	abstract: true,
	        	templateUrl: 'modules/products/views/index.html',
	            controller: 'ProductsController as prod',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        .state('products.overview', {
	        	url: '',
	        	templateUrl: 'modules/products/views/overview.html',
				controller: 'ProductsController as prod',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        .state('products.create', {
	        	url: '/create',
	        	templateUrl: 'modules/products/views/create.html',
				controller: 'ProductsController as prod',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        /*===============================
	        =            Storage            =
	        ===============================*/
	        .state('storage', {
	        	url: '/storage',
	        	abstract: true,
	            templateUrl: 'modules/storage/views/index.html',
	            controller: 'StorageController as stor',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        .state('storage.overview', {
	        	url: '',
	        	templateUrl: 'modules/storage/views/overview.html',
				controller: 'StorageController as stor',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        .state('storage.create', {
	        	url: '/create',
	        	templateUrl: 'modules/storage/views/create.html',
				controller: 'StorageController as stor',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        .state('storage.add', {
	        	url: '/add/:storageId',
	        	templateUrl: 'modules/storage/views/add.html',
				controller: 'StorageController as stor',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        /*==================================
	        =            Categories            =
	        ==================================*/
	        .state('categories', {
	        	url: '/categories',
	        	abstract: true,
	        	templateUrl: 'modules/categories/views/index.html',
	            controller: 'CategoriesController as cat',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        .state('categories.overview', {
	        	url: '',
	        	templateUrl: 'modules/categories/views/overview.html',
				controller: 'CategoriesController as cat',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        .state('categories.create', {
	        	url: '/create',
	        	templateUrl: 'modules/categories/views/create.html',
				controller: 'CategoriesController as cat',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        /*================================
	        =            Accounts            =
	        ================================*/
	        .state('accounts', {
	        	url: '/accounts',
	        	abstract: true,
	        	templateUrl: 'modules/accounts/views/index.html',
	        	resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        .state('accounts.overview', {
	        	url: '',
	        	templateUrl: 'modules/accounts/views/overview.html',
				controller: 'AccountsController as acc',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        .state('accounts.create', {
	        	url: '/create',
	        	templateUrl: 'modules/accounts/views/create.html',
				controller: 'AccountsController as acc',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        /*==============================
	        =            Groups            =
	        ==============================*/
	        .state('groups', {
	        	url: '/groups',
	        	abstract: true,
	            templateUrl: 'modules/groups/views/index.html',
	            controller: 'GroupsController as groups',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        .state('groups.overview', {
	        	url: '',
	        	templateUrl: 'modules/groups/views/overview.html',
				controller: 'GroupsController as groups',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        .state('groups.create', {
	        	url: '/create',
	        	templateUrl: 'modules/groups/views/create.html',
				controller: 'GroupsController as groups',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        /*===================================
	        =            Permissions            =
	        ===================================*/
	        .state('permissions', {
	        	url: '/permissions',
	            templateUrl: 'modules/permissions/permissions.html',
	            controller: 'PermissionsController as perm',
	            resolve: {
	            	loggedin: checkLoggedin
	            }
	        })
	        /*=============================
	        =            Login            =
	        =============================*/
	        .state('login', {
	        	url: '/login',
	        	templateUrl: 'modules/login/login.html',
	            controller: 'LoginController as login'
	        });

	    $locationProvider.html5Mode(true);
	}
})();