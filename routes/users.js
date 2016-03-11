var Router = require('koa-router');

var router = Router();


function* list(next) {

    var page = parseInt(this.query.page) || parseInt(this.form.page) || 1;

    var size = parseInt(this.query.size) || parseInt(this.form.size) || 10;

    var start = (page-1) * size;

    var rs = yield this.excuteSQL("SELECT * FROM PATIENT WHERE DEL_FLAG != 1 LIMIT ?,?",[start,size]);

    this.body = rs;

};

router.all('/user/list',list);

module.exports = router;
