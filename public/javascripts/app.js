var app = angular.module('bwl', ['ngRoute', 'ngMaterial']);

// Routing
app.config(function($routeProvider, $mdThemingProvider) {
    $routeProvider.when("/", {
        templateUrl: '/views/homepage/view.html',
        controller: 'homepageCtrl'
    })
    .when("/works", {
        template: "works"
    })
    .when("/opinions", {
        template: "opinions"
    }).otherwise({
        redirect: '/'
    });

    $mdThemingProvider.theme('myAwesome')
        .primaryPalette('blue')
        .accentPalette('blue')
        .warnPalette('red');
    $mdThemingProvider.setDefaultTheme('myAwesome');
});