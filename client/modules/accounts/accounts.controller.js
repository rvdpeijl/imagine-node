(function() {
    'use strict';

    angular
        .module('app')
        .controller('AccountsController', AccountsController);

    /* @ngInject */
    AccountsController.$inject = ['Accounts', 'Popup', 'Groups'];
    function AccountsController(Accounts, Popup, Groups) {
        /*jshint validthis: true */
        var vm = this;
        vm.accounts = {};
        vm.groups = [];

        vm.editing = {
        	id: null
        };

        activate();

        function activate () {
        	findAccounts();
	        findGroups();
	        resetAccount();
        }

        function findAccounts() {
            return Accounts.findAll().then(function(data) {
                vm.accounts = data;
                return vm.accounts;
            });
        }

        function findGroups() {
            return Groups.findAll().then(function(data) {
                vm.groups = data;
                return vm.groups;
            });
        }

        function resetAccount() {
        	vm.account = {
	        	username: '',
	        	password: '',
	        	groupId: ''
	        };
        }

        vm.createAccount = function(account) {
        	Popup.show('Creating account');
            return Accounts.create(account).then(function(res) {
            	if (res.data.success) {
            		Popup.flash('Account created');
            		activate();
            	} else {
            		Popup.flash('Create account failed');
            		console.log(res);
            	}
            });
        }

        vm.enableEdit = function(account) {
        	vm.editing.id = account._id;
        }

        vm.saveAccount = function(account) {
        	Popup.show('Saving account');
            return Accounts.save(account).then(function(res) {
            	if (res.status === 200) {
            		vm.editing.id = null;
            		Popup.flash('Account saved');
            		activate();
            	} else {
            		Popup.flash('Save account failed');
            		console.log(res);
            	}
            });
        }

        vm.deleteAccount = function(account) {
        	Popup.show('Deleting account');
            return Accounts.destroy(account).then(function(res) {
            	if (res.success) {
            		Popup.flash('Account deleted');
            		activate();
            	} else {
            		Popup.flash('Account deleting failed');
            		console.log(res);
            	}
            });
        }
    }
})();