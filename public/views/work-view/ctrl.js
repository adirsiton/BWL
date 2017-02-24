app.controller("workViewCtrl", ['$scope', '$location', 'worksApi', function($scope, $location, worksApi) {
    $scope.work = {};

    $scope.init = function() {
        // Get work name from address
        var urlParams = $location.path().split('/works/');
        urlParams = urlParams.slice(1);

        // Fetch from server
        worksApi.getWork(urlParams[0]).then(function(res) {
            $scope.work = res.data;

            // Init work pictures heights
            _.forEach($scope.work.pictures, function(pic) {
                pic.height = 0.7 * heights[Math.floor(Math.random()*heights.length)];
            })
        }, function(res) {
            // TODO: swal
            alert(res.data);
        })
    }

    var heights = [200, 225, 150, 135, 240, 310, 260, 290, 180]

    $scope.$on('$routeChangeSuccess', $scope.init);

    $scope.actions = [{
        desc: "ערוך",
        iconName: "edit",
        bgcolor: 'rgb(41,98,255)',
        func: function() {
            alert("editing this work");
        }
    }, {
        desc: "מחק",
        iconName: "close",
        bgcolor: "rgb(213,0,0)",
        func: function() {
            alert("deleted");
        }
    }]
}]);