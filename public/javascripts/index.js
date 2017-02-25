app.controller("mainCtrl", ['$rootScope', '$scope', '$location','$route', function ($rootScope, $scope, $location, $route) {
    $scope.userPicPath = '';
    $scope.loggedStatus = 'Login';
    $scope.loggedIn = false;
    
    $scope.getLoginStatus = function () {
        FB.getLoginStatus(function (response) {
            if (response.status == 'connected') {
                $scope.loggedIn = true;
                $scope.loggedStatus = 'Logout';
                $scope.userPic();
            }
            else {
                $scope.loggedIn = false;
                $scope.loggedStatus = 'Login';
            }
        });
    }

    $scope.logintoFB = function () {
        FB.login(function (response) {
            if (response.status === 'connected') {
                $scope.userPic();
                $scope.loggedIn = !$scope.loggedIn;
                $scope.loggedStatus = 'Logout';
                $route.realod();
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
            $scope.loggedIn = !$scope.loggedIn;
            $scope.loggedStatus = 'Logoin';
            $route.realod();
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
            "/me/picture?width=56&height=56",
            function (response) {
                if (response && !response.error) {
                    $scope.userPicPath = response.data.url;
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