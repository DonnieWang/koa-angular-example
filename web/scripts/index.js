/**
 * Created by donnie on 16/3/10.
 */

require('../styles/styles.css');

require('bootstrap/less/bootstrap.less');

var jquery = require('jquery');

var angular = require('angular');

var router = require('angular-ui-router');

var controllers = require('./controllers');

var services = require('./services');

var app = angular.module('app',[router]);

controllers(app);

services(app);
