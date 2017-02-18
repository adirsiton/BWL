directives.directive("workCard", function() {
    return {
        scope: {
            work: '='
        },
        templateUrl: '/directives/work-card/template.html'  
    }
});