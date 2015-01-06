(function() {
    'use strict';

    angular
        .module('app')
        .factory('Storage', Storage);

    /* @ngInject */
    function Storage($rootScope, $http) {
        var service = {
        	findAll: findAll,
        	create: create,
        	save: save,
        	destroy: destroy,
            add: add,
            subtract: subtract
        };
        return service;

        ////////////////

        function findAll() {
        	return $http.get('/api/storage')
                .then(complete)
                .catch(failed);

            function complete(response) {
                $rootScope.storages = response.data;
                return response.data;
            }

            function failed(response) {
                return response;
            }
        }

        function create(storage) {
            return $http.post('/api/storage', storage)
                .then(complete)
                .catch(failed);

            function complete(response) {
                return response;
            }

            function failed(response) {
                return response;
            }
        }

        function save(storage) {
        	return $http.put('/api/storage/' + storage._id, storage)
                .then(complete)
                .catch(failed);

            function complete(response) {
                return response;
            }

            function failed(response) {
                return response;
            }
        }

        function destroy(storage) {
            return $http.delete('/api/storage/' + storage._id)
                .then(complete)
                .catch(failed);

            function complete(response) {
                return response;
            }

            function failed(response) {
                return response;
            }
        }

        function add(storageId, productId, amount) {
        	// 
        }

        function subtract(storageId, productId, amount) {
        	//
        }
    }
})();