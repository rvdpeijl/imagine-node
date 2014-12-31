(function() {
    'use strict';

    angular
        .module('app')
        .factory('Products', Products);

    /* @ngInject */
    Products.$inject = ['$http'];

    function Products($http) {
        var service = {
            getProducts: getProducts,
            create: create,
            update: update,
            destroy: destroy,
            rules: {
                'name': {
                    'required': {
                        'value': true,
                        'message': 'Name is required'
                    }
                },
                'description': {
                    'required': {
                        'value': true,
                        'message': 'Description is required'
                    }
                }
            }
        };
        return service;

        ////////////////

        function getProducts() {
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
                return response.data;
            }

            function createProductFailed(error) {
                console.log('Error: ' + error);
            }
        }

        function update(product) {
            console.log(product);
            return $http.put('/api/products/' + product._id, product)
                .then(updateProductComplete)
                .catch(updateProductFailed);

            function updateProductComplete(response) {
                return response.data;
            }

            function updateProductFailed(error) {
                console.log('Error: ' + error.data);
            }
        }

        function destroy(product) {
            return $http.delete('/api/products/' + product._id)
                .then(deleteProductComplete)
                .catch(deleteProductFailed);

            function deleteProductComplete() {
                return product;
            }

            function deleteProductFailed(error) {
                console.log('Error: ' + error.data);
            }
        }
    }
})();