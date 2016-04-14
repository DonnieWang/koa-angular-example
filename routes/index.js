var crypto = require('crypto');

var Router = require('koa-router');

var mysql = require('mysql');

var utils = require('./utils');

module.exports = function(app,db) {

    app.use(function *(next) {

        this.db = db;

        //无事物处理
        this.executeSQL = utils.executeSQL;
        //事务处理
        this.transactionSQL = utils.transactionSQL;

        try {
            yield next;
        } catch (e) {
            console.error(utils.formatData(new Date(),"YYYY-MM-DD HH:mm:ss"),e);
        }

    });


    app.use(function *(next) {
        //检查安全性
        if (this.path.match(/\/verify/)||this.path==="/"){
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

            var md5 = crypto.createHash('md5');
            md5.update(loginpass);
            loginpass = md5.digest('hex');

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

    router.use(require('./files').routes());


    app.use(router.routes());

};


