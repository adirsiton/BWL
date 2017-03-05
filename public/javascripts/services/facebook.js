services.service('facebookApi', ['$rootScope', function ($rootScope) {
    this.getLoginStatus = function () {
        return new Promise(function (resolve, reject) {
            FB.getLoginStatus(function (response) {
                resolve(response);
            })
        });
    }

    this.logintoFB = function (name) {
        return new Promise(function (resolve, reject) {
            FB.login(function (response) {
                resolve(response);
            });
        });
    }

    this.logoutFB = function () {
        return new Promise(function (resolve, reject) {
            FB.logout(function (response) {
                resolve(response);
            });
        });
    }

    this.me = function () {
        return new Promise(function (resolve, reject) {
            FB.api(
                "/me",
                function (response) {
                    if (response && !response.error) {
                        resolve(response);
                    }
                }
            );
        });
    }

    this.userPic5656 = function () {
        return new Promise(function (resolve, reject) {
            FB.api(
                "/me/picture?width=56&height=56",
                function (response) {
                    if (response && !response.error) {
                        resolve(response);
                    }
                }
            );
        });
    }

    this.normalProfilePic = () => {
        return new Promise(function (resolve, reject) {
            FB.api(
                "/me/picture?type=normal",
                function (response) {
                    if (response && !response.error) {
                        resolve(response);
                    }
                }
            );
        })
    }

    this.checkUserDataStatus = (isNormalPic) => {
        // Checking if the user has already gotten the small user pic
        if (!$rootScope.smallUserPicPath) {
            this.userPic5656().then(function (response) {
                $rootScope.smallUserPicPath = response.data.url;
            })
        }

        // Checking if the user asked for a normal profile pic
        if (isNormalPic && !$rootScope.normalProfilePicPath) {
            this.normalProfilePic().then(function (response) {
                $rootScope.normalProfilePicPath = response.data.url;
            });
        }

        if(!$rootScope.me) {
            this.me().then(function(response) {
                $rootScope.me = response.data;
            });
        }
    }
}]);