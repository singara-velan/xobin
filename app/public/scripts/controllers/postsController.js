angular.module('todoApp')
    .controller('PostsController', ['$scope', '$location', 'postsService', 'logService', '$filter', '$uibModal', function($scope, $location, postsService, logService, $filter, $uibModal) {
        var vm = this;
        vm.isBusy = false;
        $scope.maxSize = 10;
        $scope.currentPage = 1;
        $scope.isActive = function(viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.pageChanged = function() {
            getPagedData();
            document.body.scrollTop = 0;
        };

        function getPagedData() {
            vm.pagedData = [];
            var startIndex = $scope.currentPage * 10;
            var endIndex = startIndex + 10;
            vm.pagedData = vm.posts.slice(startIndex, endIndex);
        }

        vm.getUser = function(id, post) {
            var filtered = $filter('filter')(vm.users, function(val) {
                if (val.$.Id === id) {
                    return true;
                }
                return false;
            });
            if (filtered && filtered.length > 0) {
                post.user = filtered[0].$;
                post.upDownVotes = localStorage.getItem(post.$.Id);
                return post.user.DisplayName;
            }
        };
        vm.showUser = function(user) {
            console.log(user);
            $uibModal.open({
                ariaLabelledBy: 'modal-title-bottom',
                ariaDescribedBy: 'modal-body-bottom',
                templateUrl: 'stackedModal.html',
                size: 'lg',
                controller: function($scope) {
                    $scope.user = user;
                }
            });
        }

        vm.upVote = function(post){
          var count = Number(localStorage.getItem(post.$.Id));
          if(isNaN(count)) count = 0;
          window.localStorage.setItem(post.$.Id, Number(count) + 1);
        };

        vm.downVote = function(post){
          var count = Number(localStorage.getItem(post.$.Id));
          if(isNaN(count)) count = 0;
          window.localStorage.setItem(post.$.Id, Number(count) - 1);
        }

        vm.isBusy = true;
        postsService.get().then(
            function(response) {
                vm.posts = response.data.posts.row;
                $scope.totalItems = response.data.posts.row.length;
                $scope.bigTotalItems = $scope.totalItems;
                getPagedData();
                logService.success('postsService.get()', response);
                vm.isBusy = false;
            },
            function(response) {
                logService.failed('postsService.get()', response);
            }
        );

        postsService.getUsers().then(
            function(response) {
                vm.users = response.data.users.row;
                logService.success('getUsers.get()', response);
            },
            function(response) {
                logService.failed('postsService.get()', response);
            }
        );

    }]);
angular.module('todoApp').filter('to_trusted', ['$sce', function($sce) {
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);
