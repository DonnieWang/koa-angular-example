
require('./index.css');

function homeCtrl($scope,$window,TestService) {

    $scope.dev_width = $window.innerWidth;

    $scope.dev_height = $window.innerHeight;


}

module.exports = {
    name:"home",
    state: {
        url : "/",
        template : require('./index.html'),
        controller : ['$scope','$window','TestService',homeCtrl]
    }
};

