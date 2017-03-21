app.controller("opinionsCtrl", ['$scope', '$rootScope', 'facebookApi', '$mdDialog', 'opinionsApi', '$route', function ($scope, $rootScope, facebookApi, $mdDialog, opinionsApi, $route) {

  $scope.newOpinionDialog = function (e) {
    $mdDialog.show({
      templateUrl: '/views/opinions/new-opinion/dialog.html',
      targetEvent: e,
      clickOutsideToClose: true,
      parent: angular.element(document.body),
      controller: "newOpinionCtrl",
      onComplete: function (scope, elem) {
        scope.$root = $rootScope;
      },
      onRemoving: function (event, onRemovePromise) {
        $scope.getOpinions();
      }
    })
  }

  $scope.getOpinions = function () {
    opinionsApi.getAll().then(function (opinions) {
      opinions.data.forEach(function (opinion, index, arr) {
        facebookApi.getUserProfilePicture(opinion.userFbId).then(function (path) {
          arr[index].pic = path.data.url;

          if (index == arr.length - 1) {
            $scope.opinions = opinions.data;
          }
        });
      });
    });
  }

  setTimeout(function () {
    $scope.getOpinions();
  }, 800);
}])