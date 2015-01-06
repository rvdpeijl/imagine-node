(function() {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$location', 'Permissions'];
    function AppController($scope, $location, Permissions) {
        /*jshint validthis: true */
        var vm = this;

        $scope.$on('$routeChangeStart', function(scope, next, current) {
			var permission = next.$$route.permission;
			if(_.isString(permission) && !permissions.hasPermission(permission))
				$location.path('/unauthorized');
		});

        activate();

        function activate() {
        }
    }
})();