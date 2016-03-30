/**
 * Created by donnie on 16/3/29.
 */

var $ = require('jquery');

module.exports = function(app) {

    app.factory('LoginService', ['$rootScope','$http','$q',function ( $rootScope, $http, $q ) {
        return {

            params: {},

            doLoginVerify: function(user) {
                var deferred = $q.defer();
                var url = "/api/verify";
                $http({
                    method: 'POST',
                    url: url,
                    data: $.param(user),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
                }).then(function (response) {
                    deferred.resolve(response);
                },function (e) {
                    deferred.reject(e);
                });
                return deferred.promise;
            }

        }
    }]);
};
