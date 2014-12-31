(function() {
    'use strict';

    angular
        .module('app')
        .controller('CategoriesController', CategoriesController);

    /* @ngInject */
    CategoriesController.$inject = ['Categories', 'Validator'];

    function CategoriesController(Categories, Validator) {
        /*jshint validthis: true */
        var vm = this;
        vm.categories = [];

        vm.selectedCategory = {
            id: null
        }

        vm.category = {
            name: ''
        };

        activateCategories();

        function activateCategories() {
            return Categories.getCategories().then(function(data) {
                vm.categories = data;
                return vm.categories;
            });
        }

        vm.createCategory = function(category) {
            var validator = Validator.validate(category, Categories.rules);
            if (validator.valid){
                return Categories.create(category).then(function() {
                    vm.category = {};
                    activateCategories();
                });
            } else {
                console.log(validator.errors);
            }
        }

        vm.editCategory = function(category) {
            vm.selectedCategory.id = category._id;
        }

        vm.updateCategory = function(category) {
            return Categories.update(category).then(function(data) {
                console.log('Updated category ID: ' + data._id);
                vm.selectedCategory.id = null;
                activateCategories();
            });
        }

        vm.destroyCategory = function(category) {
            return Categories.destroy(category).then(function(data) {
                console.log('Destroyed category ID: ' + data._id);
                activateCategories();
            });
        }
    }
})();