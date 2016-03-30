
var $ = require('jquery');

require('./index.css');

function homeCtrl($scope,$window) {

    $scope.dev_width = $window.innerWidth;

    $scope.dev_height = $window.innerHeight;

    $scope.test = "NodeJS + AngularJS + BootStrap + Webpack Demo";

    $scope.$on('$viewContentLoaded', function() {
        $('#app .top').show();
        $('#app .left').show();
        $('#app .content').css("top","50px").css("left","160px");
    });


}

function topCtrl($scope,$window,$state,$cookieStore) {

    $scope.dev_width = $window.innerWidth;

    $scope.dev_height = $window.innerHeight;

    $scope.current = "Home";

    $scope.doQuit = function() {

        $cookieStore.remove('currentUser');

        $state.go('login');

    };


}


module.exports = {
    name:"home",
    state: {
        url : "/",
        views : {
            "":{
                template : require('./index.html'),
                controller : ['$scope','$window',homeCtrl]
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

