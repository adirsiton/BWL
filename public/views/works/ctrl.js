app.controller("worksCtrl", ['$scope', 'worksApi', function($scope, worksApi) {
    $scope.works = [];

    $scope.fetchWorks = function() {
        worksApi.getAll().then(function(res) {
            $scope.works = res.data;
        }, function(res) {
            // TODO: dispaly pretty
            alert(res.data);
        });
    }
    $scope.fetchWorks();
}]);