
var $ = require('jquery');

module.exports = function(app) {

    var login = require('./login');

    var home = require('./home');

    var doctor = require('./doctor');

    var patient = require('./patient');

    var files = require('./files');

    app.config(["$stateProvider","$urlRouterProvider",function($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state(login.name,login.state)

            .state(home.name,home.state)

            .state(patient.list.name,patient.list.state)
            .state(patient.edit.name,patient.edit.state)

            .state(doctor.list.name,doctor.list.state)
            .state(doctor.edit.name,doctor.edit.state)

            .state(files.name,files.state)
        ;

        $urlRouterProvider.otherwise(login.state.url);

    }]);

    app.run(['$rootScope', '$location', '$cookieStore', 'gettextCatalog', function ($rootScope, $location, $cookieStore, gettextCatalog) {

        gettextCatalog.setCurrentLanguage('zh_Hans');

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var loginPage = $.inArray($location.path(), ['/login']) === -1;
            var loggedIn = !!$cookieStore.get('currentUser');
            if (loginPage && !loggedIn) {
                $location.path('/login');
            }
        });

    }]);

};
