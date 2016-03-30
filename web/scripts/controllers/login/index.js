/**
 * Created by donnie on 16/3/29.
 */

var $ = require('jquery');

require('./login.css');

function loginCtrl($scope,$window,$state,$cookieStore,$uibModal,LoginService) {

    $scope.dev_width = $window.innerWidth;

    $scope.dev_height = $window.innerHeight;

    $scope.user = {
        loginname : "",
        loginpass : ""
    }

    $scope.$on('$viewContentLoaded', function() {
        $('#app .top').hide();
        $('#app .left').hide();
        $('#app .content').css("top","0px").css("left","0px");
    });

    $scope.doVerify = function(){
        LoginService.doLoginVerify($scope.user).then(function(r){
            if(r.data.success===1) {
                $cookieStore.put('currentUser', $scope.user);
                $state.go("home");
            } else {
                var modalInstance = $uibModal.open({
                    animation: true,
                    template: '<div class="modal-header"><h3 class="modal-title">错误</h3></div><div class="modal-body"><p>登录失败</p></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">确定</button></div>',
                    controller: function($scope, $uibModalInstance, params){
                        $scope.ok = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    resolve: {
                        params: function () {
                            return $scope.user
                        }
                    },
                    windowClass: 'center-modal',
                    size:"sm"
                });
                modalInstance.result.then(function (params) {
                }, function (e) {
                    console.log(e);
                });
            }
        },function(e){
            console.log(e);
            alert("登录失败!");
        });
    };

}

module.exports = {
    name:"login",
    state: {
        url : "/login",
        views: {
            "" : {
                template : require('./login.html'),
                controller : ['$scope','$window','$state','$cookieStore','$uibModal','LoginService',loginCtrl]
            },
            "top" : {},
            "left" : {}
        }
    }
};

