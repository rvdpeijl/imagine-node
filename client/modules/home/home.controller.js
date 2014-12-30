(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    /* @ngInject */
    function HomeController() {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'HomeController';

        activate();

        function activate() {
        	console.log('HomeController initiated');
        }
    }
})();