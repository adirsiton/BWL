app.controller("workViewCtrl", ['$scope', '$location', 'worksApi', 'facebookApi', function($scope, $location, worksApi, facebookApi) {
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
            swal("שגיאה", "תקלה בעת קבלת הנתונים: " + res.data, "error");
        })
    }

    var heights = [200, 225, 150, 160, 240, 310, 260, 250, 180]

    $scope.$on('$routeChangeSuccess', $scope.init);

    $scope.updateWork = function() {
        worksApi.updateWork($scope.work).then(function() {
            swal("יש לנו את זה", "עדכון העבודה קרה בהצלחה", "success");
        }, function(res) {
            swal("שגיאה בעת העדכון", res.text, "error");
        });
    }

    $scope.actions = [{
        desc: "הוספת תמונות",
        iconName: "add",
        //bgcolor: 'rgba(41,98,255)',
        func: function() {
            alert("soon");
        }
    },
    {
        desc: "ערוך",
        iconName: "edit",
        //bgcolor: 'rgb(41,98,255)',
        func:function() {
            $scope.editMode = !$scope.editMode;
            if ($scope.editMode) {
                this.iconName = 'done';
                this.desc = 'שמור';
            } else {
                // save the work
                $scope.updateWork();
                
                this.iconName = 'edit';
                this.desc = 'ערוך';
            }
        }
    }, {
        desc: "מחק",
        iconName: "close",
        bgcolor: "rgb(213,0,0)",
        func: function() {
            swal({
                title: "האם אתה בטוח?",
                text: "אם תמחק את העבודה לא תוכל לשחזר את הנתונים",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: true,
                closeOnCancel: true
            }, function(confirmed) {
                if (confirmed) {
                    swal("העבודה נמחקה בהצלחה!", "אתה מועבר עכשיו לדף הבית", "success");
                }
            })
        }
    }]

    $scope.checkUser = function() {
        facebookApi.me().then(function(response) {
            worksApi.isAdmin(response.id).then(function(isAdmin) {
                $rootScope.isAdmin = isAdmin.data;
            })
        });
    }

    $scope.checkUser();    
}]);