
var $ = require('jquery');

require('./index.css');

function patientListCtrl($scope,$window,$state,$uibModal,PatientService) {

    $scope.dev_width = $window.innerWidth;

    $scope.dev_height = $window.innerHeight;

    $scope.loadData = function(flag) {
        PatientService.getPatientList($scope.page,$scope.size).then(function (r) {
            if(flag) $scope.datas = [];
            for(var i=0;i<r.data.length;i++) {
                $scope.datas.push(r.data[i]);
            }
        },function(e) {
            console.error(e);
        });
    };

    $scope.loadMore = function() {
        $scope.page++;
        $scope.loadData(false);
    }

    $scope.loadPage = function() {
        PatientService.getPatientPagination($scope.page,$scope.size).then(function (r) {
            $scope.total = r.data.total;
            $scope.count = r.data.count;
        },function(e) {
            console.error(e);
        });
    }

    $scope.$on('$viewContentLoaded', function() {
        $scope.datas = [];
        $scope.page = 1;
        $scope.size = 10;
        $scope.count = 0;
        $scope.total = 0;
        $scope.loadPage();
        $scope.loadData(true);
    });

    $scope.doEdit = function(patient) {

        PatientService.params.patient = patient;

        $state.go('patient-edit');

    }

    $scope.doModal = function(patient) {

        var id = patient.PATIENT_CD;

        PatientService.getPatient(id).then(function(r){
            $scope.patient = r.data;

            var html = require('./edit.html');

            var modalInstance = $uibModal.open({
                animation: true,
                template: '<div class="modal-header"><h3 class="modal-title">编辑</h3></div><div class="modal-body">'+html+'</div>',
                controller: function($scope, $uibModalInstance, DoctorService, patient){
                    $scope.patient = patient;
                    $scope.doSave = function () {
                        PatientService.doSavePatient($scope.patient).then(function(r){
                            alert('save ok');
                            delete PatientService.params.patient;
                            $uibModalInstance.close($scope.patient);
                        },function(e){
                            console.error(e);
                        });
                    };
                    $scope.doCancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                resolve: {
                    patient: function () {
                        return $scope.patient
                    }
                },
                windowClass: 'center-modal'
            });
            modalInstance.result.then(function (patient) {
                for(var i=0;i<$scope.datas.length;i++) {
                    if($scope.datas[i].PATIENT_CD===patient.PATIENT_CD) {
                        $scope.datas[i] = patient;
                    }
                }
                console.log(patient);
            }, function (e) {
                console.error(e);
            });
        },function(e){
            console.error(e);
        });
    }
}

function patientEditCtrl($scope,$window,$state,PatientService) {

    $scope.dev_width = $window.innerWidth;

    $scope.dev_height = $window.innerHeight;

    $scope.$on('$viewContentLoaded', function() {
        var id = PatientService.params.patient.PATIENT_CD;
        $scope.patient = {};
        $scope.loadData(id);
    });

    $scope.loadData = function (id) {
        PatientService.getPatient(id).then(function(r){
            $scope.patient = r.data;
        },function(e){
            console.error(e);
        });
    };

    $scope.doSave = function() {
        PatientService.doSavePatient($scope.patient).then(function(r){
            alert('save ok');
            delete PatientService.params.patient;
            $state.go('patient-list');
        },function(e){
            console.error(e);
        });
    }

    $scope.doCancel = function() {
        $window.history.back();
    }

}

function topCtrl($scope,$window,$state,$cookieStore) {

    $scope.dev_width = $window.innerWidth;

    $scope.dev_height = $window.innerHeight;

    $scope.current = "Patient";

    $scope.doQuit = function() {

        $cookieStore.remove('currentUser');

        $state.go('login');

    };


}

module.exports = {
    list: {
        name:"patient-list",
        state: {
            url : "/patient/list",
            views:{
                "":{
                    template : require('./list.html'),
                    controller : ['$scope','$window','$state', '$uibModal', 'PatientService',patientListCtrl]
                },
                "top":{
                    template : require('../../templates/topA.html'),
                    controller : ['$scope','$window','$state','$cookieStore',topCtrl]
                },
                "left":{
                    template : require('../../templates/leftB.html')
                }
            }
        }
    },
    edit: {
        name:"patient-edit",
        state: {
            url : "/patient/edit",
            views: {
                "": {
                    template: require('./edit.html'),
                    controller: ['$scope', '$window', '$state', 'PatientService', patientEditCtrl]
                },
                "top": {
                    template: require('../../templates/topA.html'),
                    controller: ['$scope', '$window', '$state', '$cookieStore', topCtrl]
                },
                "left": {
                    template: require('../../templates/leftB.html')
                }
            }
        }
    }
};

