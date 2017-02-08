app.controller("homepageCtrl", ['$scope', function ($scope) {
    $scope.currentNavItem = 'main';

    // Listen to latest work image 
    var latestWorksImgEvents = function () {
        $(".highlight").css("visibility", "hidden");
        $(".latest-works img").on("mouseover", function (e) {
            $(this).siblings(".highlight").addClass("active");
            $(this).siblings(".highlight").removeClass("leave");
            $(".highlight").css("visibility", "visible");
        }).on("mouseleave", function (e) {
            $(this).siblings(".highlight").removeClass("active");
            $(this).siblings(".highlight").addClass("leave");
        });
    };
    latestWorksImgEvents();
}])