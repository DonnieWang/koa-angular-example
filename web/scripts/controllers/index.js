
module.exports = function(app) {

    var home = require('./home');

    var user = require('./user');

    app.config(["$stateProvider","$urlRouterProvider",function($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state(home.name,home.state)

            .state(user.name,user.state)



        ;

        $urlRouterProvider.otherwise(home.state.url);

    }]);

};
