var $ = require('jquery');

module.exports = function(app) {

    app.factory('FilesService', ['$rootScope','$http','$q',function ( $rootScope, $http, $q ) {
        return {

            params: {},

            getFiles: function (page,size) {
                var deferred = $q.defer();
                var url = "/api/files/list";
                $http({
                    method: 'GET',
                    url: url
                }).then(function (response) {
                    deferred.resolve(response);
                },function (e) {
                    deferred.reject(e);
                });
                return deferred.promise;
            },

            deleteFile: function(filename) {
                var deferred = $q.defer();
                var url = "/api/files/delete"+"?"+"filename="+filename;
                $http({
                    method: 'GET',
                    url: url
                }).then(function (response) {
                    deferred.resolve(response);
                },function (e) {
                    deferred.reject(e);
                });
                return deferred.promise;
            },

            uploadFile: function(formdata) {
                var deferred = $q.defer();
                var url = "/api/files/upload";
                $http({
                    method: 'POST',
                    url: url,
                    data: formdata,
                    headers: { 'Content-Type': undefined }
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
