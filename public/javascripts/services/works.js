services.service('worksApi', ['$http', '$q', '$rootScope', function($http, $q, $rootScope) {
    this.getAll = function() {
        return $http.get('/api/works');
    }

    this.getWork = function(name) {
        return $http.get('/api/works/' + name);
    }

    this.addWork = function(work) {
        // return new Promise(function(resolve, reject) {
        //     facebookApi.me().then(function(user) {
        //         work.userId = user.id;
        //         resolve($http.post("/api/works", work));
        //     }).catch(function(e) {
        //         resolve($http.post("/api/works", work));
        //     });
        // });
        work.userId = $rootScope.me.id;
        return $http.post("/api/works", work);
    }

    this.updateWork = function(work) {
        // facebookApi.me().then(function(user) {
        //     work.userId = user.id;
        //     return $http.put("/api/works", work)
        // });
        work.userId = $rootScope.me.id;
        return $http.put("/api/works", work);        
    }

    this.deleteWork = function(workId) {
        return $http({
            method: 'delete',
            url:    "/api/works/" + $rootScope.me.id + "/" + workId
        });
    }

    this.isAdmin = function(userId) {
        return $http.get('/api/users/isadmin/' + userId);
    }
}]);