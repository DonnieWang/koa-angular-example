var Router = require('koa-router');

var router = Router();

router.all('/api/patient/pagination',function* (next) {

    var page = parseInt(this.query.page) || parseInt(this.request.body.page) || 1;

    var size = parseInt(this.query.size) || parseInt(this.request.body.size) || 10;

    var rs = yield this.executeSQL(this.db,"SELECT COUNT(*) AS count FROM PATIENT WHERE DEL_FLAG != 1");

    var count = rs[0].count;

    var total = 0;

    if(count%size===0) {
        total = parseInt(count/size);
    } else {
        total = parseInt(count/size)+1;
    }

    this.body = {count:count,total:total}

});


router.all('/api/patient/list',function* (next) {

    var page = parseInt(this.query.page) || parseInt(this.request.body.page) || 1;

    var size = parseInt(this.query.size) || parseInt(this.request.body.size) || 10;

    var start = (page-1) * size;

    var rs = yield this.executeSQL(this.db,"SELECT * FROM PATIENT WHERE DEL_FLAG != 1 LIMIT ?,?",[start,size]);

    this.body = rs

});


router.all('/api/patient/get',function* (next) {

    var id = parseInt(this.query.id) || parseInt(this.request.body.id) || 0;

    if(id>0) {

        var rs = yield this.executeSQL(this.db,"SELECT * FROM PATIENT WHERE PATIENT_CD = ? AND DEL_FLAG != 1",[id]);

        this.body = rs[0];

    } else {

        this.body = {};

    }
});


router.all('/api/patient/save',function* (next) {

    console.log(this.form);

    this.body = {'success':1};

});



module.exports = router;
