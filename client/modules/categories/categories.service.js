(function() {
    'use strict';

    angular
        .module('app')
        .factory('Categories', Categories);

    /* @ngInject */
    Categories.$inject = ['$http', '$rootScope'];

    function Categories($http, $rootScope) {
        var service = {
            findAll: findAll,
            create: create,
            save: save,
            destroy: destroy
        };

        return service;

        ////////////////

        function findAll() {
            return $http.get('/api/categories')
                .then(complete)
                .catch(failed);

            function complete(response) {
                $rootScope.categories = response.data;
                return response.data;
            }

            function failed(error) {
                console.log('Error: ' + error);
            }
        }

        function create(category) {
            return $http.post('/api/categories', category)
                .then(complete)
                .catch(failed);

            function complete(response) {
                return response;
            }

            function failed(response) {
                return response;
            }
        }

        function save(category) {
            return $http.put('/api/categories/' + category._id, category)
                .then(complete)
                .catch(failed);

            function complete(response) {
                return response;
            }

            function failed(response) {
                return response;
            }
        }

        function destroy(category) {
            return $http.delete('/api/categories/' + category._id)
                .then(complete)
                .catch(failed);

            function complete(response) {
                return response;
            }

            function failed(response) {
                return response;
            }
        }
    }
})();