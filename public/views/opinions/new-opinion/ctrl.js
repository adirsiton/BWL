app.controller("newOpinionCtrl", ['$scope', '$mdDialog', 'facebookApi', '$rootScope', 'opinionsApi', function ($scope, $mdDialog, facebookApi, $rootScope, opinionsApi) {
    $scope.opinion = '';

    $scope.close = function () {
        $mdDialog.hide();
    }

    $scope.checkUserDataStatus = function () {
        facebookApi.checkUserDataStatus(true).then(function (status) {
            if (status) {
                $scope.normalProfilePicPath = $rootScope.normalProfilePicPath;
                $scope.me = $rootScope.me.name;
                $scope.myid = $rootScope.me.id
                swal(
                    'יש !',
                    'התחברת לFacebook בהצלחה',
                    'success'
                );

                $scope.$digest();
            }
        });
    }

    $scope.addOpinion = function (opinion) {
        if (opinion != '') {
            opinionsApi.addOpinion({
                user: $scope.myid,
                opinion: opinion,
                name : $scope.me
            }).then(function () {
                $scope.close();
                swal(
                    'יש !',
                    'חוות הדעת הוספה בהצלחה, תודה !',
                    'success'
                );
            });
        }
        else {
            swal(
                'רק רגע',
                'יש להוסיף חוות דעת קודם',
                'warning'
            );
        }
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