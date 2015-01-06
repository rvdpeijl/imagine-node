(function() {
    'use strict';

    angular
        .module('app')
        .factory('Logger', Logger);

    Logger.$inject = ['Auth'];
    function Logger(Auth) {
        var service = {
            edit: edit
        };

        return service;

        ////////////////

        function edit(model, object) {
        	Auth.currentAccount().then(function(account) {
        		var log = {
        			message: account.username+' edited '+model+' '+object.name
        		};
        	});
        }
    }
})();