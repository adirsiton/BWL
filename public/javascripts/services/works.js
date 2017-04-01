services.service('worksApi', ['$http', '$q', '$rootScope', function($http, $q, $rootScope) {
    this.getAll = function() {
        return $http.get('/api/works');
    }

    this.getWork = function(name) {
        return $http.get('/api/works/' + name);
    }

    this.addWork = function(work) {
        work.userId = $rootScope.me.id;
        return $http.post("/api/works", work);
    }

    this.updateWork = function(work) {
        work.userId = $rootScope.me.id;
        return $http.put("/api/works", work);        
    }

    this.deleteWork = function(workId) {
        return $http({
            method: 'delete',
            url:    "/api/works/" + $rootScope.me.id + "/" + workId
        });
    }

    this.deletePicture = function(workId, picPath) {
        return $http.delete('/api/gallery/' + $rootScope.me.id + '/' + workId + '/' + picPath);
    }

    this.isAdmin = function(userId) {
        return $http.get('/api/users/isadmin/' + userId);
    }
}]);