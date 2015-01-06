(function() {
    'use strict';

    angular
        .module('app')
        .controller('CategoriesController', CategoriesController);

    /* @ngInject */
    CategoriesController.$inject = ['Categories', 'Popup', '$rootScope'];

    function CategoriesController(Categories, Popup, $rootScope) {
        /*jshint validthis: true */
        var vm = this;
        vm.categories = [];

        vm.editing = {
            id: null
        }

        vm.category = {
            name: ''
        };

        activate();

        function activate() {
            activateCategories();
        }

        function activateCategories() {
            return Categories.findAll().then(function(data) {
                vm.categories = data;
                return vm.categories;
            });
        }

        vm.createCategory = function(category) {
            Popup.show('Creating category');
            return Categories.create(category).then(function(res) {
                if (res.status === 201) {
                    activate();
                    Popup.flash('Category created');
                } else {
                    if (res.status === 400) {
                        Popup.flash('Category creation failed. One or more fields are required!');
                    };
                }
            });
        }

        vm.editCategory = function(category) {
            vm.editing.id = category._id;
        }

        vm.saveCategory = function(category) {
            Popup.show('Saving category');
            return Categories.save(category).then(function(res) {
                if (res.status === 200) {
                    activate();
                    vm.editing.id = null;
                    Popup.flash('Category saved');
                } else {
                    Popup.flash('Save category failed');
                    console.log(res);
                }
            });
        }

        vm.destroyCategory = function(category) {
            Popup.show('Deleting category');
            return Categories.destroy(category).then(function(res) {
                if (res.status === 204) {
                    activate();
                    Popup.flash('Category deleted');
                } else {
                    Popup.flash('Category deleting failed');
                    console.log(res);
                }
            });
        }
    }
})();