var Router = require('koa-router');

var mysql = require('mysql');

var utils = require('./utils');

module.exports = function(app,db) {

    app.use(function *(next) {
        var ctx = this;
        ctx.db = db;
        ctx.form = ctx.request.body;
        ctx.executeSQL = utils.executeSQL;

        try {
            yield next;
        } catch (e) {
            console.error(utils.formatData(new Date(),"YYYY-MM-DD HH:mm:ss"),e);
        }

    });


    app.use(function *(next) {
        //检查安全性
        if (this.path.match(/\/verify/)){
            yield next;
        } else {
            if(!!!this.session.user) {
                this.status = 401;
            } else {
                yield next;
            }
        }
    });


    var router = Router();

    function* index(next) {
        const ctx = this;
        yield ctx.render("index",{});
    };

    router.all('/',index);



    function *verify(next) {
        var loginname = this.query.loginname || this.request.body.loginname || "";
        var loginpass = this.query.loginpass || this.request.body.loginpass || "";
        if(!!loginname && !!loginpass) {
            //TODO 用户登录验证

            //如果验证成功,记入Session
            this.session.user = {
                name:loginname,
                pass:loginpass
            }
            this.body = {success:1};
        } else {
            this.body = {success:0};
        }
    }

    router.all('/api/verify',verify);


    router.use(require('./patient').routes());

    router.use(require('./doctor').routes());


    app.use(router.routes());

};


