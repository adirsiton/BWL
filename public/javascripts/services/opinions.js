services.service('opinionsApi', ['$http', '$q', function($http, $q) {
    this.addOpinion = function(newOpinion) {
        return $http.post('/api/opinions/add', newOpinion);
    }

    this.getAll = function() {
        return $http.get('/api/opinions');
    }
}]);