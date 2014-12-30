(function() {
    'use strict';

    angular
        .module('app')
        .factory('Categories', Categories);

    /* @ngInject */
    Categories.$inject = ['$http'];

    function Categories($http) {
        var service = {
            getCategories: getCategories,
            create: create,
            destroy: destroy,
            rules: {
                'name': {
                    'required': {
                        'value': true,
                        'message': 'Name is required'
                    }
                }
            }
        };
        return service;

        ////////////////

        function getCategories() {
            return $http.get('/api/categories')
                .then(getCategoriesComplete)
                .catch(getCategoriesFailed);

            function getCategoriesComplete(response) {
                return response.data;
            }

            function getCategoriesFailed(error) {
                console.log('Error: ' + error);
            }
        }

        function create(category) {
            return $http.post('/api/categories', category)
                .then(createCategoryComplete)
                .catch(createCategoryFailed);

            function createCategoryComplete(response) {
                return response.data;
            }

            function createCategoryFailed(error) {
                console.log('Error: ' + error);
            }
        }

        function destroy(category) {
            return $http.delete('/api/categories/' + category._id)
                .then(deleteCategoryComplete)
                .catch(deleteCategoryFailed);

            function deleteCategoryComplete() {
                return category;
            }

            function deleteCategoryFailed(error) {
                console.log('Error: ' + error.data);
            }
        }
    }
})();