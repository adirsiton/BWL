app.controller("workViewCtrl", ['$scope', '$location', 'worksApi', 'facebookApi', '$location', '$timeout', '$mdDialog', '$rootScope', function($scope, $location, worksApi, facebookApi, $location, $timeout, $mdDialog, $rootScope) {
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

    $scope.pictureClick = function(pic) {
        if ($scope.editMode) {
            worksApi.deletePicture($scope.work._id, pic.picPath).then(function() {
                alertify.success("התמונה נמחקה בהצלחה");
                pic.hide = true;
            }).catch(function(res) {
                swal("שגיאה בעת מחיקת התמונה", res.data, "error");
            })
        }
    }

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
            $scope.showAddPicturesDialog();
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

                swal("לחץ על אחת התמונות כדי להסיר אותה");
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
                    worksApi.deleteWork($scope.work._id).then(function(res) {
                        alertify.success("העבודה נמחקה בהצלחה, אתה מועבר לדף קטלוג העבודות");
                        $timeout(function() {
                            $location.path("works");
                        }, 1000);
                    }).catch(function(res) {
                        alertify.error("חלה שגיאה בעת מחיקת העבודה: " + res.text);
                    });
                }
            })
        }
    }]

    $scope.showAddPicturesDialog = function() {
        $mdDialog.show({
            templateUrl: '/views/work-view/add-pictures/dialog.html',
            clickOutsideToClose: true,
            parent: angular.element(document.body),
            controller: "addPicturesCtrl",
            onComplete: function(scope) {
                scope.dropzone = new Dropzone("#dropzone", {
                    url: "/api/gallery/upload",
                    init: function() {
                        this.on("sending", function(file, xhr, formData){
                            formData.append("workId", scope.work._id);
                            formData.append("userId", scope.userId);
                        });
                    },
                    dictDefaultMessage: "<strong>שלב שני: העלה תמונות!</strong><br />גרור לכאן תמונות כדי להעלות אותם",
                    accept: function(file, done) {
                        var _this = this;

                        // Check if the picture already exist
                        if (_.find(scope.work.pictures, pic => pic.picPath == file.name)) {
                            swal({
                                title: "התמונה כבר קיימת",
                                text: "אם תאשר, התמונה הקיימת תוחלף במה שהעלאת עכשיו. האם אתה בטוח? מדובר על " + file.name,
                                type: "warning",
                                showCancelButton: true,
                                closeOnConfirm: true
                            }, function(confirmed) {
                                if (confirmed) {
                                    done();
                                }
                            })
                        } else {
                            done
                            if (!scope.work.pictures) {
                                scope.work.pictures = [];
                            }
                            scope.work.pictures.push({ picPath: file.name });
                        }
                    }
                }); 
            },
            scope: {
                work: $scope.work,
                userId: $rootScope.me.id
            }
        })
    }
 
}]);