app.controller("newOpinionCtrl", ['$scope', '$mdDialog', 'facebookApi', '$rootScope', function ($scope, $mdDialog, facebookApi, $rootScope) {
    $scope.close = function () {
        $mdDialog.hide();
    }

    $scope.checkUserDataStatus = function () {
        facebookApi.checkUserDataStatus(true).then(function (status) {
            if (status) {
                $scope.normalProfilePicPath = $rootScope.normalProfilePicPath;
                $scope.me = $rootScope.me.name;
                swal(
                    'יש !',
                    'התחברת לFacebook בהצלחה',
                    'success'
                );
                
                $scope.$digest();
            }
        });
    }

    // If the user is not logged in yet
    if (!$rootScope.loggedIn) {
        setTimeout(function () {
            facebookApi.getLoginStatus().then(function (response) {
                if (response.status != 'connected') {
                    facebookApi.logintoFB().then(function (response) {
                        if (response.status == 'connected') {
                            $scope.checkUserDataStatus();
                        }
                        else {
                            swal(
                                'סליחה...',
                                'אירעה שגיאה בהתחברות לFacebook',
                                'error'
                            )
                        }
                    })
                }
            })

        }, 800);
    }
    else {
        $scope.checkUserDataStatus();
    }
}]);