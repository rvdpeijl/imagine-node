(function() {
    'use strict';

    angular
        .module('app')
        .factory('Groups', Groups);

    /* @ngInject */
    function Groups($http, $rootScope) {
        var service = {
            findAll: findAll,
            create: create,
            destroy: destroy,
            save: save
        };
        return service;

        ////////////////

        function findOne(id) {
            return $http.get('/api/groups/' + id)
                .then(complete)
                .catch(failed);

            function complete(response) {
                return response.data;
            }

            function failed(response) {
                return response;
            }
        }

        function findAll() {
        	return $http.get('/api/groups')
                .then(complete)
                .catch(failed);

            function complete(response) {
                $rootScope.groups = response.data;
                return response.data;
            }

            function failed(response) {
                return response;
            }
        }

        function create(group) {
            return $http.post('/api/groups', group)
                .then(complete)
                .catch(failed);

            function complete(response) {
                return response;
            }

            function failed(response) {
                return response;
            }
        }

        function save(group) {
        	return $http.put('/api/groups/' + group._id, group)
                .then(complete)
                .catch(failed);

            function complete(response) {
                $rootScope.$broadcast('permissionsChanged');
                return response;
            }

            function failed(response) {
                return response;
            }
        }

        function destroy(group) {
            return $http.delete('/api/groups/' + group._id)
                .then(complete)
                .catch(failed);

            function complete(response) {
                return response;
            }

            function failed(response) {
                return response;
            }
        }
    }
})();