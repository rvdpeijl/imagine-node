(function() {
    'use strict';

    angular
        .module('app')
        .factory('Products', Products);

    /* @ngInject */
    Products.$inject = ['$http'];

    function Products($http) {
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
                .then(getProductsComplete)
                .catch(getProductsFailed);

            function getProductsComplete(response) {
                return response.data;
            }

            function getProductsFailed(error) {
                console.log('Error: ' + error);
            }
        }

        function create(product) {
            return $http.post('/api/products', product)
                .then(createProductComplete)
                .catch(createProductFailed);

            function createProductComplete(response) {
                return response;
            }

            function createProductFailed(response) {
                return response;
            }
        }

        function save(product) {
            return $http.put('/api/products/' + product._id, product)
                .then(updateProductComplete)
                .catch(updateProductFailed);

            function updateProductComplete(response) {
                return response;
            }

            function updateProductFailed(response) {
                return response;
            }
        }

        function destroy(product) {
            return $http.delete('/api/products/' + product._id)
                .then(deleteProductComplete)
                .catch(deleteProductFailed);

            function deleteProductComplete(response) {
                return response;
            }

            function deleteProductFailed(response) {
                return response;
            }
        }
    }
})();