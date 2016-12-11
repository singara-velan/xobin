angular.module('todoApp', ['ngRoute', 'ui.bootstrap', 'ngSanitize'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'PostsController as vm',
                templateUrl: '/views/posts.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
