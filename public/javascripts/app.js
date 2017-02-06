var app = angular.module('bwl', ['ngMaterial', 'ngRoute']);

// Routing
app.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: '/views/homepage/view.html',
        controller: 'homepageCtrl'
    }).otherwise({
        redirect: '/'
    })
})