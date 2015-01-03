(function() {
    'use strict';

    angular
        .module('app')
        .factory('Auth', Auth);

    /* @ngInject */
    function Auth($http) {
        var service = {
            attemptLogin: attemptLogin
        };
        return service;

        ////////////////

        function attemptLogin(credentials) {
            return $http.post('/login', credentials)
                .then(attemptLoginComplete)
                .catch(attemptLoginFailed);

            function attemptLoginComplete(response) {
                return response.data;
            }

            function attemptLoginFailed(error) {
                if (error.status === 401) {
                    return { error: 401, message: 'Bad username / password' };
                }
                return error;
            }
        }

        /**
            
            TODO:
            - permissions aan groups model toevoegen | groups = { name: '', permissions: [{1}, {2}] };
        
        **/

        function getPermissions(module, account) {
            var permissions = {
                readable: false,
                writable: false
            };

            return permissions;
            // in scope:
            // ---------
            // if (account.permissions.readable || account.permissions.writable) 
        }
    }
})();