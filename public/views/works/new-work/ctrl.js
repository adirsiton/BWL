app.controller("newWorkCtrl", function($scope, $mdDialog, worksApi, facebookApi) {
    $scope.saved = false;

    $scope.hide = function() {
        $mdDialog.hide();
    }

    $scope.work = {
        title: '',
        description: ''
    }

    $scope.save = function() {
        // Validation check
        if ($scope.work.title == '') {
            swal("שגיאה", "יש להזין כותרת לעבודה", "error");
            $scope.saved = false;
        } else {
            $scope.saving = true;

            // Save the work
            worksApi.addWork($scope.work).then(function(res) {
                $scope.work = res.data;
                $scope.saved = true;
                $scope.saving = false;
                $scope.dropzone = new Dropzone("#dropzone", {
                    url: "/api/gallery/upload",
                    init: function() {
                        facebookApi.me().then(function(user) {
                            $scope.userId = user.id;
                        })
                        
                        this.on("sending", function(file, xhr, formData){
                            formData.append("workId", res.data._id);
                            formData.append("userId", $scope.userId);
                        });
                    },
                    dictDefaultMessage: "<strong>שלב שני: העלה תמונות!</strong><br />גרור לכאן תמונות כדי להעלות אותם",
                    accept: function(file, done) {
                        var _this = this;

                        // Check if the picture already exist
                        if (_.find($scope.work.pictures, pic => pic.picPath == file.name)) {
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
                            done();

                            if (!$scope.work.pictures) {
                                $scope.work.pictures = [];
                            }
                            $scope.work.pictures.push({ picPath: file.name });
                        }
                    }
                }); 
            }).catch(function(err) {
                $scope.saving = false;
                $scope.saved = false;
                swal("לא ניתן להוסיף את העבודה", err.data, "error");
            });
        }  
    }
});
