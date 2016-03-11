var Router = require('koa-router');

var mysql = require('mysql');

var utils = require('./utils');

module.exports = function(app,db) {

    app.use(function *(next) {
        var ctx = this;
        ctx.form = ctx.request.body;
        ctx.excuteSQL = function (sql, params) {
            return function (done) {
                var start = new Date().getTime();
                db.getConnection(function (err, connection) {
                    connection.query(sql, params, function (e, r) {
                        var duration = new Date().getTime() - start;
                        console.info(utils.formatData(new Date(),"YYYY-MM-DD HH:mm:ss.SSS"),' duration: ' + duration + ' ms\t SQL: ' + sql + ' params: ' + JSON.stringify(params));
                        if (e) {
                            console.error(utils.formatData(new Date(),"YYYY-MM-DD HH:mm:ss"), e);
                            return done(null, null);
                        } else {
                            return done(null, r);
                        }
                    });
                    connection.release();
                });
            }
        };

        try {
            yield next;
        } catch (e) {
            console.error(utils.formatData(new Date(),"YYYY-MM-DD HH:mm:ss"),e);
        }

    });


    app.use(function *(next) {

        if(!!!this.session.user) {
            console.log(this.url);
        }

        yield next;
    });




    var router = Router();

    function* index(next) {
        const ctx = this;
        yield ctx.render("index",{});
    };

    router.all('/',index);


    router.use(require('./users').routes());






    app.use(router.routes());

};


