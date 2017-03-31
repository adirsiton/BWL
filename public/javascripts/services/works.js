services.service('worksApi', ['$http', '$q', 'facebookApi', function($http, $q, facebookApi) {
    this.getAll = function() {
        return $http.get('/api/works');
    }

    this.getWork = function(name) {
        return $http.get('/api/works/' + name);
    }

    this.addWork = function(work) {
        return new Promise(function(resolve, reject) {
            facebookApi.me().then(function(user) {
                work.userId = user.id;
                resolve($http.post("/api/works", work));
            }).catch(function(e) {
                resolve($http.post("/api/works", work));
            });
        });
    }

    this.updateWork = function(work) {
        facebookApi.me().then(function(user) {
            work.userId = user.id;
            return $http.put("/api/works", work)
        });
    }
    this.isAdmin = function(userId) {
        return $http.get('/api/users/isadmin/' + userId);
    }
}]);