services.service('worksApi', ['$http', '$q', function($http, $q) {
    this.getAll = function() {
        return $http.get('/api/works');
    }

    this.getWork = function(name) {
        return $http.get('/api/works/' + name);
    }

    this.addWork = function(work) {
        return $http.post("/api/works", work);
    }
}]);