app.controller("mainCtrl", ['$rootScope', '$scope', '$location', 'facebookApi', function ($rootScope, $scope, $location, facebookApi) {
    $rootScope.smallUserPicPath = '';
    $rootScope.loggedStatus = 'Login';
    $rootScope.loggedIn = false;

    $scope.handleLoginStatus = function () {
        facebookApi.getLoginStatus().then(function (response) {
            // Checking the receieved response
            if (response.status == 'connected') {
                $rootScope.loggedIn = true;
                $rootScope.loggedStatus = 'Logout';
                $rootScope.userPic();
            }
            else {
                $rootScope.loggedIn = false;
                $rootScope.loggedStatus = 'Login';
                $rootScope.me = null;
                $rootscope.smallUserPicPath = null;
            }
        });
    }

    $rootScope.userPic = function () {
        facebookApi.userPic5656().then(function (response) {
            $rootScope.smallUserPicPath = response.data.url;
        });
    }

    $scope.loginToFacebook = function () {
        facebookApi.logintoFB().then(function (response) {
            if (response.status === 'connected') {
                $rootScope.userPic();
                $rootScope.loggedIn = !$rootScope.loggedIn;
                $rootScope.loggedStatus = 'Logout';
            } else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.
            } else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
            }
        });

    }

    $scope.logoutFromFacebook = function () {
        facebookApi.logoutFB().then(function () {
            $rootScope.loggedIn = !$scope.loggedIn;
            $rootScope.loggedStatus = 'Logoin';
        });
    }

    setTimeout(function () {
        $scope.handleLoginStatus();
    }, 800);

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