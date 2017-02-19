directives.directive("workCard", function() {
    return {
        scope: {
            work: '=',
            onClick: '&'
        },
        templateUrl: '/directives/work-card/template.html'  
    }
});