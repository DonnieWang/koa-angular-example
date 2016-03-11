var koa = require('koa');
var compress = require('koa-compress');
var render = require('koa-swig');
var staticCache = require('koa-static-cache');
var bodyParser = require('koa-bodyparser');
var session = require('koa-generic-session');
var mysqlStore = require('koa-mysql-session');

var http = require('http');
var path = require('path');
var fs = require('fs');

var mysql = require('mysql');

//var logger = require('koa-logger2')('ip [year-month-day time] "method url protocol/httpVer" status size "referer" "userAgent" duration ms');

//var filters = {
//    format: function (time) {
//        return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
//    }
//};

var logger = require('koa-log4js');

var dbConfig = {
    connectionLimit : 10,
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "test"
};

var db = mysql.createPool(dbConfig);

var app = koa();

app.context.render = render({
    root: path.join(__dirname, './public'),
    autoescape: true,
    cache: 'memory',
    ext: 'html'
});

app.keys = ["test"];

app.use(compress());

//app.use(logger.gen);
app.use(logger());

app.use(bodyParser());

app.use(session({
    store: new mysqlStore(dbConfig),
    rolling: true,
    cookie: {
        maxage: 1800000
    }
}));

app.use(staticCache(path.join(__dirname, './public'), {
    gzip: true
}));

require('./routes')(app,db);

app.listen(8080);

console.log('koa server listening on', 8080);
