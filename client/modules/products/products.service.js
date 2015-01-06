(function() {
    'use strict';

    angular
        .module('app')
        .factory('Products', Products);

    /* @ngInject */
    Products.$inject = ['$rootScope', '$http', 'Logger'];

    function Products($rootScope, $http, Logger) {
        
        var service = {
            findAll: findAll,
            create: create,
            save: save,
            destroy: destroy
        };

        return service;

        ////////////////

        function findAll() {
            return $http.get('/api/products')
                .then(complete)
                .catch(failed);

            function complete(response) {
                $rootScope.products = response.data;
                return response.data;
            }

            function failed(error) {
                console.log('Error: ' + error);
            }
        }

        function create(product) {
            return $http.post('/api/products', product)
                .then(complete)
                .catch(failed);

            function complete(response) {
                return response;
            }

            function failed(response) {
                return response;
            }
        }

        function save(product) {
            return $http.put('/api/products/' + product._id, product)
                .then(complete)
                .catch(failed);

            function complete(response) {
                Logger.edit('product', response.data);
                return response;
            }

            function failed(response) {
                return response;
            }
        }

        function destroy(product) {
            return $http.delete('/api/products/' + product._id)
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