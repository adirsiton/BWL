app.controller("mainCtrl", ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
    $scope.mainMenu = {
        items: [{
            description: "עמוד ראשי",
            link: "/"
        }, {
            description: "העבודות שלנו",
            link: "/works"
        }, {
            description: "חוות דעת",
            link: "/opinions"
        }],
        redirect: function(path) {
            $location.path(path);
        }
    }
}])