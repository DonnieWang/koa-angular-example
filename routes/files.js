/**
 * Created by donnie on 16/4/14.
 */

var path = require('path');

var Router = require('koa-router');

var fs = require('co-fs');

var mime = require('mime');

var router = Router();

router.all('/api/files/list',function* (next) {
    var result = [];
    var files = yield fs.readdir(path.join(__dirname, '../upload'));
    for(var i=0;i<files.length;i++) {
        var file = files[i];
        var stat = yield fs.stat(path.join(__dirname, '../upload/'+file));
        result.push({
            name:file,
            size:stat.size,
            date:stat.birthtime
        });
    }
    this.body = result;
});

router.all('/api/files/download',function* (next) {
    var filename = this.query.filename || this.request.body.filename || "";
    var filepath = path.join(__dirname, '../upload/'+filename);
    var fstat = yield fs.stat(filepath);
    if (fstat.isFile()) {
        var mimetype = mime.lookup(filepath);
        this.set('Content-disposition', 'attachment; filename=' + filename);
        this.set('Content-type', mimetype);
        this.set('Content-Length', fstat.size);
        this.body = require('fs').createReadStream(filepath);
    } else {
        this.status = 404;
    }
});

function remove(file) {
    return function (done) {
        require('fs').unlink(file,function(e){
            if (e != null) {
                done(null, e);
            } else {
                done(null, "ok");
            }
        });
    };
}

router.all('/api/files/delete',function* (next) {
    var filename = this.query.filename || this.request.body.filename || "";
    var filepath = path.join(__dirname, '../upload/'+filename);
    var fstat = yield fs.stat(filepath);
    if (fstat.isFile()) {
        var result = yield remove(filepath);

        if(!!result && result==="ok") {
            this.body = {success:1};
            return;
        }
    }
    this.body = {success:0};
});



function rename(oldfile,newfile) {
    return function (done) {
        require('fs').rename(oldfile, newfile, function (e) {
            if (e != null) {
                done(null, e);
            } else {
                done(null, "ok");
            }
        });
    };
}

router.all('/api/files/upload',function* (next) {

    var file = this.request.body.files.file;

    console.log(file.name,file.path,file.size);

    var name = this.request.body.fields.name || file.name;

    var newpath = path.join(__dirname, '../upload/'+name);

    var result = yield rename(file.path,newpath);

    if(!!result && result==="ok") {
        this.body = {success:1};
    } else {
        this.body = {success:0};
    }

});

module.exports = router;
