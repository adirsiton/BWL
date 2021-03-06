app.controller("worksCtrl", ['$scope', '$location', '$mdDialog', 'worksApi', 'facebookApi', '$rootScope',
                             function($scope, $location, $mdDialog, worksApi, facebookApi, $rootScope) {
    $scope.works = [];

    $scope.fetchWorks = function() {
        worksApi.getAll().then(function(res) {
            $scope.works = res.data;
        }, function(res) {
            swal("שגיאה בעת הצגת העבודות", res.data, "error");
        });
    }
    $scope.fetchWorks();

    $scope.workClick = function(work) {
        $location.path("/works/" + work._id);
    }

    $scope.newWorkDialog = function(e) {
        $mdDialog.show({
            templateUrl: '/views/works/new-work/dialog.html',
            targetEvent: e,
            clickOutsideToClose: true,
            parent: angular.element(document.body),
            controller: "newWorkCtrl"
        })
    }

    $scope.checkUser = function() {
        facebookApi.me().then(function(response) {
            worksApi.isAdmin(response.id).then(function(isAdmin) {
                $rootScope.isAdmin = isAdmin.data;
            })
        });
    }

    $scope.checkUser();
}]);