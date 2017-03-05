app.controller("worksCtrl", ['$scope', '$location', '$mdDialog', 'worksApi', 
                             function($scope, $location, $mdDialog, worksApi) {
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

    $scope.newWorkDialog = function(e) {
        $mdDialog.show({
            templateUrl: '/views/works/new-work/dialog.html',
            targetEvent: e,
            clickOutsideToClose: true,
            parent: angular.element(document.body),
            controller: "newWorkCtrl",
            onComplete: function(scope, elem) {
                scope.dropzone = new Dropzone("#dropzone", {
                    url: '/file/upload'
                })
            }
        })
    }
}]);