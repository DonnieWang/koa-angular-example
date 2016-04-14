
var $ = require('jquery');

require('./index.css');

function filesCtrl($scope,$window,$state,$uibModal,$location,FilesService) {

    $scope.dev_width = $window.innerWidth;

    $scope.dev_height = $window.innerHeight;

    $scope.loadData = function() {
        FilesService.getFiles().then(function (r) {
            $scope.datas = [];
            for(var i=0;i<r.data.length;i++) {
                $scope.datas.push(r.data[i]);
            }
        },function(e) {
            console.error(e);
        });
    };

    $scope.$on('$viewContentLoaded', function() {
        $scope.datas = [];
        $scope.loadData();
    });

    $scope.doUpload = function() {

        var html = require('./upload.html');

        var modalInstance = $uibModal.open({
            animation: true,
            template: '<div class="modal-header"><h3 class="modal-title">上传</h3></div><div class="modal-body">'+html+'</div>',
            controller: ['$scope','$uibModalInstance','FilesService',function($scope, $uibModalInstance, FilesService){
                $scope.doSave = function () {

                    var formdata = new FormData();
                    formdata.append('file',$('#file')[0].files[0]);
                    formdata.append('name',$('#name').val());

                    FilesService.uploadFile(formdata).then(function(r){
                        alert('save ok');
                        $uibModalInstance.close();
                    },function(e){
                        console.error(e);
                    });
                };
                $scope.doCancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }],
            resolve: {
            },
            windowClass: 'center-modal'
        });
        modalInstance.result.then(function() {
            $scope.loadData();
        }, function (e) {
            console.error(e);
        });
    };

    $scope.doDownload = function(data) {
        var anchor = angular.element('<a/>');
        anchor.css({display: 'none'});
        angular.element(document.body).append(anchor);
        anchor.attr({
            href:'/api/files/download?filename='+data.name
        })[0].click();
        anchor.remove();
        // window.location = '/api/files/download?filename='+data.name;
    };

    $scope.doDelete = function(data) {
        FilesService.deleteFile(data.name).then(function(r){
            alert('delete ok');
            $scope.loadData();
        },function(e){
            console.error(e);
        });
    };
}

function topCtrl($scope,$window,$state,$cookieStore) {

    $scope.dev_width = $window.innerWidth;

    $scope.dev_height = $window.innerHeight;

    $scope.current = "Files";

    $scope.doQuit = function() {

        $cookieStore.remove('currentUser');

        $state.go('login');

    };


}


module.exports = {
    name:"files",
    state: {
        url : "/files",
        views : {
            "":{
                template : require('./files.html'),
                controller : ['$scope','$window','$state', '$uibModal', '$location', 'FilesService', filesCtrl]
            },
            "top":{
                template : require('../../templates/topA.html'),
                controller : ['$scope','$window','$state','$cookieStore',topCtrl]
            },
            "left":{
                template : require('../../templates/leftA.html')
            }
        }
    }
};

