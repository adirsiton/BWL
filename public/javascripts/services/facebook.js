services.service('facebookApi', ['$rootScope', '$http', function ($rootScope, $http) {
    var self = this;

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
                self.me().then(function(user) {
                    $rootScope.me = user;
                    self.isAdmin(user.id).then(function(res) {
                        $rootScope.isAdmin = res.data;
                    });
                });
                resolve(response);
            });
        });
    }

    this.logoutFB = function () {
        return new Promise(function (resolve, reject) {
            FB.logout(function (response) {
                resolve(response);
                $rootScope.isAdmin = false;
            });
        });
    }

    this.isAdmin = function(userId) {
        return $http.get('/api/users/isadmin/' + userId);
    }

    this.me = function () {
        return new Promise(function (resolve, reject) {
            FB.api(
                "/me",
                function (response) {
                    if (response && !response.error) {
                        resolve(response);
                    } else {
                        reject(response.error);
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

    this.getUserProfilePicture = (userFbId) => {
        return new Promise(function (resolve, reject) {
            FB.api(
                "/" + userFbId + "/picture?type=normal",
                function (response) {
                    if (response && !response.error) {
                        resolve(response);
                    }
                }
            );
        })
    }

    this.checkUserDataStatus = function (isNormalPic) {
        return new Promise(function (resolve, reject, funcs) {
            // Checking if the user has already gotten the small user pic
            if (!$rootScope.smallUserPicPath) {
                self.userPic5656().then(function (response) {
                    $rootScope.smallUserPicPath = response.data.url;

                    // Checking if the user asked for a normal profile pic
                    if (isNormalPic && !$rootScope.normalProfilePicPath) {
                        self.normalProfilePic().then(function (response) {
                            $rootScope.normalProfilePicPath = response.data.url;

                            if (!$rootScope.me) {
                                self.me().then(function (response) {
                                    $rootScope.me = {
                                        name: response.name,
                                        id: response.id
                                    };

                                    resolve(true);
                                })
                            }
                            else {
                                resolve(true);
                            }
                        })
                    }
                })
            }
        })
    }
}]);