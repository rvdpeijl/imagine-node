(function() {
    'use strict';

    angular
        .module('app')
        .controller('GroupsController', GroupsController);

    GroupsController.$inject = ['Groups', 'Popup', 'Permissions', '$location'];

    function GroupsController(Groups, Popup, Permissions, $location) {
        /*jshint validthis: true */
        var vm                  = this;
        vm.title                = 'Groups';
        vm.groups               = [];
        vm.permissions          = [];
        vm.editingPermissions   = {
            ids: {}
        };

        vm.selectedPermissions  = {
            ids: {}
        };

        vm.editing = {
        	id: null
        };

        activate();

        function activate() {
            findGroups();
            findPermissions();
            resetGroup();
        }

        function findGroups() {
            return Groups.findAll().then(function(data) {
                vm.groups = data;
                return vm.groups;
            });
        }

        function findPermissions() {
            return Permissions.findAll().then(function(response) {
                vm.permissions = response;
                angular.forEach(vm.permissions, function(value, key) { 
                    vm.selectedPermissions.ids[value._id] = false; 
                    vm.editingPermissions.ids[value._id] = false;
                });
                return vm.permissions;
            });
        }

        function resetGroup() {
        	vm.group = {
        		name: '',
                permissions: []
        	};
        }

        vm.createGroup = function(group) {
            angular.forEach(vm.selectedPermissions.ids, function(value, key) { if (value === true) { group.permissions.push(key) }; });
        	Popup.show('Creating group');
            return Groups.create(group).then(function(res) {
            	if (res.status === 201) {
            		activate();
            		Popup.flash('Group created');
            	} else {
                    if (res.status === 400) {
                        Popup.flash('Group creation failed. One or more fields are required!');
                    };
            	}
            });
        }

        vm.editGroup = function(group) {
        	vm.editing.id = group._id;
            vm.editingPermissions.ids = {};
            angular.forEach(group.permissions, function(value, key) { vm.editingPermissions.ids[value] = true });
        }

        vm.saveGroup = function(group) {
            group.permissions = [];
            angular.forEach(vm.editingPermissions.ids, function(value, key) { if (value === true){ group.permissions.push(key); } });
        	Popup.show('Saving group');
            return Groups.save(group).then(function(res) {
            	if (res.status === 200) {
            		activate();
            		vm.editing.id = null;
            		Popup.flash('Group saved');
            	} else {
            		Popup.flash('Save group failed');
            		console.log(res);
            	}
            });
        }


        vm.destroyGroup = function(group) {
        	Popup.show('Deleting group');
            return Groups.destroy(group).then(function(res) {
            	if (res.status === 204) {
            		activate();
            		Popup.flash('Group deleted');
            	} else {
            		Popup.flash('Group deleting failed');
            		console.log(res);
            	}
            });
        }

        vm.hasPermission = function (group, permission) {
            return group.permissions.indexOf(permission._id) > -1;
        }
    }
})();