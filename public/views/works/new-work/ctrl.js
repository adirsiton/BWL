app.controller("newWorkCtrl",['$scope','$mdDialog', function($scope, $mdDialog) {
    $scope.cancel = function() {
        $mdDialog.cancel();
    }
}]);