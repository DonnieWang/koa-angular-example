var $ = require('jquery');

module.exports = function(app) {

    app.factory('DoctorService', ['$rootScope','$http','$q',function ( $rootScope, $http, $q ) {
        return {

            params: {},

            getDoctorPagination: function (page,size) {
                var deferred = $q.defer();
                var url = "/api/doctor/pagination"+"?"+"page="+page+"&"+"size="+size;
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

            getDoctorList: function (page,size) {
                var deferred = $q.defer();
                var url = "/api/doctor/list"+"?"+"page="+page+"&"+"size="+size;
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

            getDoctor: function(id) {
                var deferred = $q.defer();
                var url = "/api/doctor/get"+"?"+"id="+id;
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

            doSaveDoctor: function(doctor) {
                var deferred = $q.defer();
                var url = "/api/doctor/save";
                $http({
                    method: 'POST',
                    url: url,
                    data: $.param(doctor),
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
