(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductsController', ProductsController);

    /* @ngInject */
    ProductsController.$inject = ['Products', 'Categories', 'Validator', 'Popup'];

    function ProductsController(Products, Categories, Validator, Popup) {
        /*jshint validthis: true */
        var vm = this;
        vm.products = [];
        vm.categories = [];

        activate();

        function activate() {
            activateProducts();
            activateCategories();

            vm.product = {
                name: '', 
                categoryId: null,
                description: ''
            };
        }

        vm.editing = {
            id: null,
            categoryId: null
        };

        function activateProducts() {
            return Products.findAll().then(function(data) {
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
            Popup.show('Creating product');
            return Products.create(product).then(function(res) {
                if (res.status === 201) {
                    activate();
                    Popup.flash('Product created');
                } else {
                    Popup.flash('Create product failed');
                    console.log(res);
                }
            });
        }

        vm.enableEdit = function(product) {
            vm.editing.id = product._id;
            var category = _.where(vm.categories, { '_id': product.categoryId });
            vm.editing.categoryId = category[0]._id;
        }

        vm.saveProduct = function(product) {
            Popup.show('Saving product');
            return Products.save(product).then(function(res) {
                if (res.status === 200) {
                    activate();
                    vm.editing.id = null;
                    vm.editing.categoryId = null;
                    Popup.flash('Product saved');
                } else {
                    Popup.flash('Save product failed');
                    console.log(res);
                }
            });
        }

        vm.destroyProduct = function(product) {
            Popup.show('Deleting product');
            return Products.destroy(product).then(function(res) {
                if (res.status === 204) {
                    activate();
                    Popup.flash('Product deleted');
                } else {
                    Popup.flash('Product deleting failed');
                    console.log(res);
                }
            });
        }
    }
})();