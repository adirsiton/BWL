app.controller("mainCtrl", ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
    $scope.userPicPath  = '';
    
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

    $scope.setUserImage = function (path) {
        $scope.userPicPath = path;
        //document.getElementById("userPic").src = path;
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

    $scope.userPic = function () {
        FB.api(
            "/me/picture",
            function (response) {
                if (response && !response.error) {
                    $scope.setUserImage(response.data.url);
                }
            }
        );
    }

    setTimeout(function () {
        $scope.getLoginStatus();
    }, 500);

    $scope.mainMenu = {
        items: [{
            description: "עמוד ראשי",
            link: "/"
        }, {
            description: "העבודות שלנו",
            link: "/works"
        }, {
            description: "חוות דעת",
            link: "/opinions"
        }],
        redirect: function (item) {
            $location.path(item.link);

            // Unselect any select menu item
            _.forEach($scope.mainMenu.items, function (item) {
                item.selected = false;
            });

            item.selected = true;
        }
    }

    // Select the menu item loaded from url
    var selectUrlItem = function () {
        var item = _.find($scope.mainMenu.items, function (item) {
            return item.link == $location.path();
        });

        if (item != undefined) {
            item.selected = true;
        }
    }
    selectUrlItem();
}])