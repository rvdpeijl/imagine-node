(function() {
    'use strict';

    angular
        .module('app')
        .controller('StorageController', StorageController);

    StorageController.$inject = ['Storage', 'Popup', 'Products', '$stateParams', '$rootScope'];
    function StorageController(Storage, Popup, Products, $stateParams, $rootScope) {
        /*jshint validthis: true */
        var vm = this;
        vm.storages = [];
        vm.products = [];
        vm.editing = { id: null };
        vm.addingProducts = false;

        vm.params = $stateParams;

        activate();

        function activate() {
            activateStorage();

            vm.storage = {
                name: '', 
                description: '',
                supply: []
            };
        }

        function activateStorage() {
            findStorages();
            findProducts();
            
        }

        function findStorages() {
            return Storage.findAll().then(function(data) {
                vm.storages = data;
                return vm.storages;
            });
        }

        function findProducts() {
            return Products.findAll().then(function(data) {
                vm.products = data;
                return vm.products;
            });
        }

        vm.createStorage = function(storage) {
            Popup.show('Creating storage');
            return Storage.create(storage).then(function(res) {
                if (res.status === 201) {
                    activate();
                    Popup.flash('Storage created');
                } else {
                    Popup.flash('Create storage failed');
                    console.log(res);
                }
            });
        }

        vm.editStorage = function(storage) {
            vm.editing.id = storage._id;
        }

        vm.saveStorage = function(storage) {
            Popup.show('Saving storage');
            return Storage.save(storage).then(function(res) {
                if (res.status === 200) {
                    activate();
                    vm.editing.id = null;
                    Popup.flash('Storage saved');
                } else {
                    Popup.flash('Save storage failed');
                    console.log(res);
                }
            });
        }

        vm.destroyStorage = function(storage) {
            Popup.show('Deleting storage');
            return Storage.destroy(storage).then(function(res) {
                if (res.status === 204) {
                    activate();
                    Popup.flash('Storage deleted');
                } else {
                    Popup.flash('Storage deleting failed');
                    console.log(res);
                }
            });
        }

        vm.addProducts = function(storage) {
            vm.addingProducts = true;
            vm.currentStorage = storage;
        }

        vm.addProduct = function(product) {
            var storage = _.findWhere(vm.storages, { _id: vm.params.storageId });
            Popup.flash('Adding '+product.amount+' '+product.name+' to storage '+storage.name);

            if (_.first(storage.supply, { productId: product._id})) {
                _.forEach(storage.supply, function(prod) { 
                    if (prod.productId === product._id) {
                        prod.amount += product.amount;
                    };
                });
            } else {
                storage.supply.push({
                    productId: product._id,
                    amount: Number(product.amount)
                });
            }

            return Storage.save(storage).then(function(res) {
                if (res.status === 200) {
                    activate();
                    vm.editing.id = null;
                    Popup.flash('Product added');
                } else {
                    Popup.flash('Add product failed');
                    console.log(res);
                }
            });
        }

        vm.currentSupply = function(id) {
            if (vm.params.storageId !== undefined) {
                var storage = _.findWhere(vm.storages, { _id: vm.params.storageId });
                console.log(storage);
                if (storage !== undefined) {
                    var currentSupply = _.findWhere(storage.supply, { productId: id });
                    console.log(currentSupply);
                    if (currentSupply !== undefined) { 
                        return currentSupply.amount 
                    }
                    return 0;
                }
                return 0;
            }
            return 0;
        }

        vm.addProductsDone = function() {
            vm.addingProducts = false;
            vm.editing.id = null;
        }
    }
})();