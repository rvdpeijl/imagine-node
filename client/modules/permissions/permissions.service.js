(function() {
    'use strict';

    angular
        .module('app')
        .factory('Permissions', Permissions);

    Permissions.$inject = ['$http', 'Groups', 'Auth', '$rootScope']
    function Permissions($http, Groups, Auth, $rootScope) {
        var service = {
            findAll: findAll,
            create: create,
            save: save,
            destroy: destroy,
            hasPermission: hasPermission
        };

        return service;

        ////////////////

        function findAll() {
            return $http.get('/api/permissions')
                .then(complete)
                .catch(failed);

            function complete(response) {
                $rootScope.permissions = response.data;
                return response.data;
            }

            function failed(error) {
                return error;
            }
        }

        function create(permission) {
            return $http.post('/api/permissions', permission)
                .then(complete)
                .catch(failed);

            function complete(response) {
                return response;
            }

            function failed(response) {
                return response;
            }
        }

        function save(permission) {
            return $http.put('/api/permissions/' + permission._id, permission)
                .then(complete)
                .catch(failed);

            function complete(response) {
                return response;
            }

            function failed(response) {
                return response;
            }
        }

        function destroy(permission) {
            return $http.delete('/api/permissions/' + permission._id)
                .then(complete)
                .catch(failed);

            function complete(response) {
                return response;
            }

            function failed(response) {
                return response;
            }
        }

        function hasPermission(permission) {
            return Auth.currentAccount().then(function(account) {
                if (account !== '0') {
                    return service.findAll().then(function(response) {
                        var permissions = response;
                        var group = _.findWhere($rootScope.groups, { _id: account.groupId });
                        var temp = _.findWhere(permissions, { slur: permission });
                        var haspermission = _.contains(group.permissions, temp._id);
                        return haspermission;
                    });
                }
                return false;
            });
        }
    }
})();