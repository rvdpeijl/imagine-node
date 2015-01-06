(function() {
    'use strict';

    angular
        .module('app')
        .factory('Auth', Auth);

    /* @ngInject */
    function Auth($http, $rootScope) {
        var service = {
            attemptLogin: attemptLogin,
            currentAccount: currentAccount
        };
        return service;

        ////////////////

        function attemptLogin(credentials) {
            return $http.post('/login', credentials)
                .then(complete)
                .catch(failed);

            function complete(response) {
                $rootScope.$broadcast('permissionsChanged');
                $rootScope.loggedin = true;
                return response.data;
            }

            function failed(error) {
                if (error.status === 401) {
                    return { error: 401, message: 'Bad username / password' };
                }
                return error;
            }
        }

        function currentAccount() {
            return $http.get('/loggedin')
                .then(complete)
                .catch(failed);

            function complete(response) {
                $rootScope.loggedin = true;
                return response.data;
            }

            function failed(error) {
                return error;
            }
        }
    }
})();