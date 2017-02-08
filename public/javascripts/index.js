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
        redirect: function(item) {
            $location.path(item.link);
            
            // Unselect any select menu item
            _.forEach($scope.mainMenu.items, function(item) {
                item.selected = false;
            });

            item.selected = true;
        }
    }

    // Select the menu item loaded from url
    var selectUrlItem = function() {
        var item = _.find($scope.mainMenu.items, function(item) {
            return item.link == $location.path();
        });

        if (item != undefined) {
            item.selected = true;
        }
    }
    selectUrlItem();
}])