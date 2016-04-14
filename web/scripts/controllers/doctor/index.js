
var $ = require('jquery');

require('./index.css');

function doctorListCtrl($scope,$window,$state,$uibModal,DoctorService) {

    $scope.dev_width = $window.innerWidth;

    $scope.dev_height = $window.innerHeight;

    $scope.loadData = function(flag) {
        DoctorService.getDoctorList($scope.page,$scope.size).then(function (r) {
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
        DoctorService.getDoctorPagination($scope.page,$scope.size).then(function (r) {
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

    $scope.doEdit = function(doctor) {

        DoctorService.params.doctor = doctor;

        $state.go('doctor-edit');

    }

    $scope.doModal = function(doctor) {

        var id = doctor.DOCTOR_ID;

        DoctorService.getDoctor(id).then(function(r){
            $scope.doctor = r.data;

            var html = require('./edit.html');

            var modalInstance = $uibModal.open({
                animation: true,
                template: '<div class="modal-header"><h3 class="modal-title">编辑</h3></div><div class="modal-body">'+html+'</div>',
                controller: ['$scope','$uibModalInstance','DoctorService','doctor',function($scope, $uibModalInstance, DoctorService, doctor){
                    $scope.doctor = doctor;
                    $scope.doSave = function () {
                        DoctorService.doSaveDoctor($scope.doctor).then(function(r){
                            alert('save ok');
                            delete DoctorService.params.doctor;
                            $uibModalInstance.close($scope.doctor);
                        },function(e){
                            console.error(e);
                        });
                    };
                    $scope.doCancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }],
                resolve: {
                    doctor: function () {
                        return $scope.doctor
                    }
                },
                windowClass: 'center-modal'
            });
            modalInstance.result.then(function (doctor) {
                for(var i=0;i<$scope.datas.length;i++) {
                    if($scope.datas[i].DOCTOR_ID===doctor.DOCTOR_ID) {
                        $scope.datas[i] = doctor;
                    }
                }
                console.log(doctor);
            }, function (e) {
                console.error(e);
            });
        },function(e){
            console.error(e);
        });
    }
}

function doctorEditCtrl($scope,$window,$state,DoctorService) {

    $scope.dev_width = $window.innerWidth;

    $scope.dev_height = $window.innerHeight;

    $scope.$on('$viewContentLoaded', function() {
        var id = DoctorService.params.doctor.DOCTOR_ID;
        $scope.doctor = {};
        $scope.loadData(id);
    });

    $scope.loadData = function (id) {
        DoctorService.getDoctor(id).then(function(r){
            $scope.doctor = r.data;
        },function(e){
            console.error(e);
        });
    };

    $scope.doSave = function() {
        DoctorService.doSaveDoctor($scope.doctor).then(function(r){
            alert('save ok');
            delete DoctorService.params.doctor;
            $state.go('doctor-list');
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

    $scope.current = "Doctor";

    $scope.doQuit = function() {

        $cookieStore.remove('currentUser');

        $state.go('login');

    };


}

module.exports = {
    list: {
        name:"doctor-list",
        state: {
            url : "/doctor/list",
            views: {
                "" : {
                    template : require('./list.html'),
                    controller : ['$scope','$window','$state', '$uibModal', 'DoctorService',doctorListCtrl]
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
        name:"doctor-edit",
        state: {
            url : "/doctor/edit",
            views: {
                "": {
                    template: require('./edit.html'),
                    controller: ['$scope', '$window', '$state', 'DoctorService', doctorEditCtrl]
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

