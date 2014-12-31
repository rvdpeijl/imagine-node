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

        vm.selectedProduct = {
            id: null,
            categoryId: null
        };
        
        vm.product = {
            name: '', 
            categoryId: null,
            description: ''
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
            vm.selectedProduct.id = product._id;
            var category = _.where(vm.categories, { '_id': product.categoryId });
            vm.selectedProduct.categoryId = category[0]._id;
        }

        vm.updateProduct = function(product) {
            return Products.update(product).then(function(data) {
                console.log('Updated product ID: ' + data._id);
                vm.selectedProduct.id = null;
                vm.selectedProduct.categoryId = null;
                activateProducts();
            });
        }

        vm.destroyProduct = function(product) {
            return Products.destroy(product).then(function(data) {
                console.log('Destroyed product ID: ' + data._id);
                activateProducts();
            });
        }
    }
})();