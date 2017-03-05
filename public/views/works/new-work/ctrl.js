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
        } else {
            // Save the work
            worksApi.addWork($scope.work).then(function() {
                $scope.saved = true;
                $scope.dropzone = new Dropzone("#dropzone", {
                    url: "/api/works/upload"
                }); 
            });
        }  
    }
});