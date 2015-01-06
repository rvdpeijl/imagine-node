(function() {
    'use strict';

    angular
        .module('app')
        .directive('hasPermission', hasPermission);

    hasPermission.$inject = ['Groups', 'Permissions', '$rootScope'];

    function hasPermission (Groups, Permissions, $rootScope) {

        var directive = {
            link: link,
            restrict: 'A'
        };

        return directive;

        function link(scope, element, attrs) {
        	if(!_.isString(attrs.hasPermission)) {
        		throw 'hasPermission value must be a string';
        	}

        	var value = attrs.hasPermission.trim();
	      	var notPermissionFlag = value[0] === '!';
	      	if(notPermissionFlag) {
				value = value.slice(1).trim();
	      	}

	      	function toggleVisibilityBasedOnPermission() {
		        Permissions.hasPermission(value).then(function(hasPermission) {
		        	if(hasPermission && !notPermissionFlag || !hasPermission && notPermissionFlag)
						element.show();
					else
						element.hide();
		        });
			}
			
			toggleVisibilityBasedOnPermission();
			$rootScope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);
		}
    }
})();