(function() {
    'use strict';

    angular
        .module('app')
        .factory('Popup', Popup);

    Popup.$inject = ['$rootScope', '$timeout'];
    function Popup($rootScope, $timeout) {
        var service = {
            show: show,
            hide: hide,
            flash: flash,
            errors: errors
        };
        return service;

        ////////////////

        function show(message) {
        	$rootScope.popup.visible = true;
        	$rootScope.popup.message = message;
        }

        function hide() {
        	$rootScope.popup.visible = false;
        	$rootScope.popup.message = 'Loading...';
        }

        function flash(message) {
        	show(message);
        	$timeout(function() {
        		hide();
        	}, 2000);
        }

        function errors(object) {
            if (object.data.code === 11000) {
                flash('Duplicate key: one or more keys already exist in database');
            };
        }
    }
})();