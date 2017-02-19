var app = angular.module('bwl', ['ngRoute', 'ngMaterial', 'bwlServices', 'directives', 'wu.masonry']);

// Routing
app.config(function($routeProvider, $mdThemingProvider, $mdIconProvider) {
    $routeProvider.when("/", {
        templateUrl: '/views/homepage/view.html',
        controller: 'homepageCtrl'
    })
    .when("/works", {
        templateUrl: "/views/works/view.html",
        controller: 'worksCtrl'
    })
    .when("/works/:name", {
        templateUrl: "/views/work-view/view.html"
    })
    .when("/opinions", {
        templateUrl: "/views/opinions/view.html",
        controller: "opinionsCtrl"
    }).otherwise({
        redirect: '/'
    });

    $mdThemingProvider.theme('myAwesome')
        .primaryPalette('blue')
        .accentPalette('blue')
        .warnPalette('red');
    $mdThemingProvider.setDefaultTheme('myAwesome');

    $mdIconProvider
        .iconSet("md", "/libs/material-design-icons-3.0.1/social/svg/production", 36)
        .defaultIconSet("/libs/material-design-icons-3.0.1/social/svg/production", 36);
});