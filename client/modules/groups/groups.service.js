(function() {
    'use strict';

    angular
        .module('app')
        .factory('Groups', Groups);

    /* @ngInject */
    function Groups($http) {
        var service = {
            findAll: findAll,
            create: create,
            destroy: destroy,
            save: save
        };
        return service;

        ////////////////

        function findAll() {
        	return $http.get('/api/groups')
                .then(getGroupsComplete)
                .catch(getGroupsFailed);

            function getGroupsComplete(response) {
                return response.data;
            }

            function getGroupsFailed(error) {
                console.log('Error: ' + error);
            }
        }

        function create(group) {
            return $http.post('/api/groups', group)
                .then(createGroupComplete)
                .catch(createGroupFailed);

            function createGroupComplete(response) {
                return response;
            }

            function createGroupFailed(response) {
                return response;
            }
        }

        function save(group) {
        	return $http.put('/api/groups/' + group._id, group)
                .then(saveGroupComplete)
                .catch(saveGroupFailed);

            function saveGroupComplete(response) {
                return response;
            }

            function saveGroupFailed(response) {
                return response;
            }
        }

        function destroy(group) {
            return $http.delete('/api/groups/' + group._id)
                .then(destroyGroupComplete)
                .catch(destroyGroupFailed);

            function destroyGroupComplete(response) {
                return response;
            }

            function destroyGroupFailed(response) {
                return response;
            }
        }
    }
})();