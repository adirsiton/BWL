app.controller("homepageCtrl", ['$scope', function ($scope) {
    $scope.currentNavItem = 'main';
    $scope.path = "/libs/material-design-icons-3.0.1/image/1x_web/ic_image_black_36dp.png";

    $scope.getLoginStatus = function () {
        FB.getLoginStatus(function (response) {
            if (response.status != 'connected') {
                $scope.logintoFB(response);
            }
            else {
                $scope.userPic();
            }
        });
    }

    $scope.logintoFB = function () {
        FB.login(function (response) {
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
            } else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.
            } else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
            }
        });
    }

    $scope.logoutFB = function () {
        FB.logout(function (response) {
            // Logged out
        });
    }

    $scope.me = function () {
        FB.api(
            "/me",
            function (response) {
                if (response && !response.error) {
                    console.log(response);
                }
            }
        );
    };

    $scope.userPic = function() {
        FB.api(
            "/me/picture",
            function (response) {
                if (response && !response.error) {
                    $scope.path = response.data.url;
                }
            }
        );
    }

    setTimeout(function () {
        $scope.getLoginStatus();
    }, 250);
}])