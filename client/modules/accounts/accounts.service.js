(function() {
    'use strict';

    angular
        .module('app')
        .factory('Accounts', Accounts);

    /* @ngInject */
    function Accounts($http, $rootScope) {
        var service = {
            findAll: findAll,
            destroy: destroy,
            create: create,
            save: save
        };
        return service;

        ////////////////

        function findAll() {
            return $http.get('/api/accounts')
                .then(complete)
                .catch(failed);

            function complete(response) {
                $rootScope.accounts = response.data;
                return response.data;
            }

            function failed(error) {
                console.log('Error: ' + error.data);
            }
        }

        function create(account) {
            return $http.post('/register', account)
                .then(complete)
                .catch(failed);

            function complete(response) {
                return response;
            }

            function failed(response) {
                return response;
            }
        }

        function save(account) {
            return $http.put('/api/accounts/' + account._id, account)
                .then(complete)
                .catch(failed);

            function complete(response) {
                return response;
            }

            function failed(response) {
                return response;
            }
        }

        function destroy(account) {
            return $http.delete('/api/accounts/' + account._id)
                .then(complete)
                .catch(failed);

            function complete() {
                return { success: true, message: 'Deleted account with id'+account._id };
            }

            function failed(error) {
                return { error: true, message: error };
            }
        }
    }
})();