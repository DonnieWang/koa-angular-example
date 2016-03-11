
require('./index.css');

function userCtrl($scope,$window,TestService) {

    $scope.dev_width = $window.innerWidth;

    $scope.dev_height = $window.innerHeight;

    $scope.loadData = function(page,size) {
        TestService.getUserList(page,size).then(function (r) {
            for(var i=0;i<r.length;i++) {
                $scope.datas.push(r[i]);
            }
        },function(e) {
            console.error(e);
        });
    };

    $scope.loadMore = function() {
        $scope.loadData(++$scope.page,$scope.size);
    }

    $scope.$on('$viewContentLoaded', function() {
        $scope.datas = [];
        $scope.page = 1;
        $scope.size = 10;
        $scope.loadData($scope.page,$scope.size);
    });

}

module.exports = {
    name:"user",
    state: {
        url : "/",
        template : require('./index.html'),
        controller : ['$scope','$window','TestService',userCtrl]
    }
};

