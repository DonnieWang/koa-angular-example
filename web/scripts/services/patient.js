var $ = require('jquery');

module.exports = function(app) {

    app.factory('PatientService', ['$rootScope','$http','$q',function ( $rootScope, $http, $q ) {
        return {

            params: {},

            getPatientPagination: function (page,size) {
                var deferred = $q.defer();
                var url = "/api/patient/pagination"+"?"+"page="+page+"&"+"size="+size;
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

            getPatientList: function (page,size) {
                var deferred = $q.defer();
                var url = "/api/patient/list"+"?"+"page="+page+"&"+"size="+size;
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

            getPatient: function (id) {
                var deferred = $q.defer();
                var url = "/api/patient/get"+"?"+"id="+id;
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

            doSavePatient: function(patient) {
                var deferred = $q.defer();
                var url = "/api/patient/save";
                $http({
                    method: 'POST',
                    url: url,
                    data: $.param(patient),
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
