app.controller("homepageCtrl", ['$scope', function ($scope) {
    $scope.currentNavItem = 'main';

    $scope.getLoginStatus = function () {
        FB.getLoginStatus(function (response) {
            if(response.status != 'connected') {
                $scope.logintoFB(response);
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

    setTimeout(function () {
        $scope.getLoginStatus();
    }, 100);

    // Listen to latest work image 
    var latestWorksImgEvents = function() {
        $(".highlight").css("visibility", "hidden");
        $(".latest-works img").on("mouseover", function(e) {
            $(this).siblings(".highlight").addClass("active");
            $(this).siblings(".highlight").removeClass("leave");
            $(".highlight").css("visibility", "visible");
        }).on("mouseleave", function(e) {
            $(this).siblings(".highlight").removeClass("active");
            $(this).siblings(".highlight").addClass("leave");
        });
    };
    latestWorksImgEvents();
}])