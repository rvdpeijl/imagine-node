(function() {
    'use strict';

    angular
        .module('app')
        .factory('Accounts', Accounts);

    /* @ngInject */
    function Accounts($http) {
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
                .then(getAccountsComplete)
                .catch(getAccountsFailed);

            function getAccountsComplete(response) {
                return response.data;
            }

            function getAccountsFailed(error) {
                console.log('Error: ' + error.data);
            }
        }

        function create(account) {
            return $http.post('/register', account)
                .then(createAccountComplete)
                .catch(createAccountFailed);

            function createAccountComplete(response) {
                return response;
            }

            function createAccountFailed(response) {
                return response;
            }
        }

        function save(account) {
            return $http.put('/api/accounts/' + account._id, account)
                .then(saveAccountComplete)
                .catch(saveAccountFailed);

            function saveAccountComplete(response) {
                return response;
            }

            function saveAccountFailed(response) {
                return response;
            }
        }

        function destroy(account) {
            return $http.delete('/api/accounts/' + account._id)
                .then(deleteAccountComplete)
                .catch(deleteAccountFailed);

            function deleteAccountComplete() {
                return { success: true, message: 'Deleted account with id'+account._id };
            }

            function deleteAccountFailed(error) {
                return { error: true, message: error };
            }
        }
    }
})();