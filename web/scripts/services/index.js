module.exports = function(app) {

    app.factory('TestService', ['$rootScope','$http','$q',function ( $rootScope, $http, $q ) {
        return {

            getUserList: function (page,size) {
                var deferred = $q.defer();
                var url = "/user/list"+"?"+"page="+page+"&"+"size="+size;
                $http({
                    method: 'GET',
                    url: url
                }).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject(new Error(data));
                });
                return deferred.promise;
            }

        }
    }]);
};
