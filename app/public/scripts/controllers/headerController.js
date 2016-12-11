angular.module('todoApp')
    .controller('HeaderController', ['$scope', '$location', function($scope, $location) {
      var vm = this;
      vm.dt= new Date();
        $scope.isActive = function(viewLocation) {
            return viewLocation === $location.path();
        };

    }]);
