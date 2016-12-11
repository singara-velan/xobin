angular.module('todoApp')
    // each function returns a promise object
    .factory('postsService', ['$http', function($http) {
        return {
            get: function() {
                return $http.get('/api/dump/posts');
            },
            getUsers: function() {
                return $http.get('/api/dump/users');
            }
        }
    }]);
