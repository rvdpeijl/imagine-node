(function() {
    'use strict';

    angular
        .module('app')
        .controller('GroupsController', GroupsController);

    GroupsController.$inject = ['Groups', 'Popup'];

    function GroupsController(Groups, Popup) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'Groups';
        vm.groups = [];

        vm.editing = {
        	id: null
        };

        activate();

        function activate() {
            findGroups();
            resetGroup();
        }

        function findGroups() {
            return Groups.findAll().then(function(data) {
                vm.groups = data;
                return vm.groups;
            });
        }

        function resetGroup() {
        	vm.group = {
        		name: ''
        	};
        }

        vm.createGroup = function(group) {
        	Popup.show('Creating group');
            return Groups.create(group).then(function(res) {
            	if (res.status === 201) {
            		activate();
            		Popup.flash('Group created');
            	} else {
            		Popup.flash('Create group failed');
            		console.log(res);
            	}
            });
        }

        vm.enableEdit = function(group) {
        	vm.editing.id = group._id;
        }

        vm.saveGroup = function(group) {
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
    }
})();