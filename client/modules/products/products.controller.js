(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductsController', ProductsController);

    /* @ngInject */
    ProductsController.$inject = ['Products', 'Categories', 'Validator'];

    function ProductsController(Products, Categories, Validator) {
        /*jshint validthis: true */
        var vm = this;
        vm.products = [];
        vm.categories = [];
        vm.editEnabled = {
            id: null
        };
        
        vm.product = {
            name: '', 
            categoryId: null,
            description: ''
        };

        vm.category = {
            name: ''
        };

        activateProducts();
        activateCategories();

        function activateProducts() {
            return Products.getProducts().then(function(data) {
                vm.products = data;
                return vm.products;
            });
        }

        function activateCategories() {
            return Categories.getCategories().then(function(data) {
                vm.categories = data;
                return vm.categories;
            });
        }

        vm.createProduct = function(product) {
            var validator = Validator.validate(product, Products.rules);
            if (validator.valid){
                return Products.create(product).then(function() {
                    vm.product = {};
                    activateProducts();
                });
            } else {
                console.log(validator.errors);
            }
        }

        vm.editProduct = function(product) {
            vm.editEnabled.id = product._id;
        }

        vm.updateProduct = function(product) {
            console.log(product);
            return Products.update(product).then(function(data) {
                console.log('Updated product ID: ' + data._id);
                activateProducts();
                vm.editEnabled.id = null;
            });
        }

        vm.destroyProduct = function(product) {
            return Products.destroy(product).then(function(data) {
                console.log('Destroyed product ID: ' + data._id);
                activateProducts();
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

        vm.destroyCategory = function(category) {
            return Categories.destroy(category).then(function(data) {
                console.log('Destroyed category ID: ' + data._id);
                activateCategories();
            });
        }
    }
})();