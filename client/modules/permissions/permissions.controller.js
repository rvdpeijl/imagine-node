(function() {
    'use strict';

    angular
        .module('app')
        .controller('PermissionsController', PermissionsController);

    PermissionsController.$inject = ['Permissions', 'Popup']
    function PermissionsController(Permissions, Popup) {
        /*jshint validthis: true */
        var vm = this;
        vm.permissions = [];

        vm.editing = {
        	id: null
        };

        activate();

        function activate() {
        	activatePermissions();
        	resetPermission();
        }

        function resetPermission() {
        	vm.permission = {};
        }

        function activatePermissions() {
        	return Permissions.findAll().then(function(response) {
                vm.permissions = response;
                return vm.permissions;
            });
        }

        vm.createPermission = function(permission) {
        	Popup.show('Creating permission');
            return Permissions.create(permission).then(function(res) {
                if (res.status === 201) {
                    activate();
                    Popup.flash('Permission created');
                } else {
                    Popup.flash('Create permission failed');
                    console.log(res);
                }
            });
        }

        vm.editPermission = function(permission) {
        	vm.editing.id = permission._id;
        }

        vm.savePermission = function(permission) {
        	Popup.show('Saving permission');
            return Permissions.save(permission).then(function(res) {
            	if (res.status === 200) {
            		activate();
            		vm.editing.id = null;
            		Popup.flash('Permission saved');
            	} else {
            		Popup.flash('Save permission failed');
            		console.log(res);
            	}
            });
        }


        vm.destroyPermission = function(permission) {
        	Popup.show('Deleting permission');
            return Permissions.destroy(permission).then(function(res) {
            	if (res.status === 204) {
            		activate();
            		Popup.flash('Permission deleted');
            	} else {
            		Popup.flash('Permission deleting failed');
            		console.log(res);
            	}
            });
        }
    }
})();