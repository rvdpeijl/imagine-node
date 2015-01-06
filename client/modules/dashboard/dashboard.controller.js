(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    /* @ngInject */
    function DashboardController() {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'Dashboard';

        activate();

        function activate() {
        }
    }
})();