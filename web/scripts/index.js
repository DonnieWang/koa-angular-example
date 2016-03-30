/**
 * Created by donnie on 16/3/10.
 */

require('../styles/styles.css');

require('../styles/modal.scss');

require('bootstrap/less/bootstrap.less');

var angular = require('angular');

var router = require('angular-ui-router');

var bootstrap = require('angular-ui-bootstrap');

var cookie = require('angular-cookies');

var gettext = require('angular-gettext');

var controllers = require('./controllers');

var services = require('./services');

var app = angular.module('app',[router,bootstrap,cookie,'gettext']);

controllers(app);

services(app);
