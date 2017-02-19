app.controller("worksCtrl", ['$scope', '$location', 'worksApi', function($scope, $location, worksApi) {
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

    $scope.workClick = function(work) {
        $location.path("/works/" + work.title);
    }
}]);