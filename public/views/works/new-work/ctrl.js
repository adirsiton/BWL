app.controller("newWorkCtrl", function($scope, $mdDialog, worksApi) {
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
                $scope.saved = true;
                $scope.saving = false;
                $scope.dropzone = new Dropzone("#dropzone", {
                    url: "/api/works/upload"
                }); 
            }).catch(function(err) {
                $scope.saving = false;
                $scope.saved = false;
                swal("לא ניתן להוסיף את העבודה", err.data, "error");
            });
        }  
    }
});