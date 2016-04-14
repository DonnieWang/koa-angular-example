/**
 * Created by donnie on 16/3/11.
 */

var monent = require('moment');

exports.formatData = function(date,format) {
    return monent(date).format(format);
};

exports.executeSQL = function (db, sql, params) {
    return function (done) {
        var start = new Date().getTime();
        db.getConnection(function (err, connection) {
            connection.query(sql, params, function (e, r) {
                var duration = new Date().getTime() - start;
                console.info(exports.formatData(new Date(),"YYYY-MM-DD HH:mm:ss.SSS"),' duration: ' + duration + ' ms\t SQL: ' + sql + ' params: ' + JSON.stringify(params));
                if (e) {
                    console.error(exports.formatData(new Date(),"YYYY-MM-DD HH:mm:ss"), e);
                    return done(null, null);
                } else {
                    return done(null, r);
                }
            });
            connection.release();
        });
    }
};

exports.transactionSQL = function() {
    var _connection = null;
    var _db = null;
    function _connect() {
        return function(fn) {
            _db.getConnection(function(err, connection) {
                if (err) {
                    return fn(err);
                }
                _connection = connection;
                fn(null,true);
            });
        }
    }
    function _release() {
        return function(fn) {
            _connection.release();
            fn(null,true);
        }
    }
    function _excute(sql,params) {
        return function(fn) {
            _connection.query(sql,params,function(err,rows){
                if (err) {
                    return fn(err);
                }
                fn(null,rows);
            });
        }
    }
    function _commit() {
        return function(fn) {
            _connection.commit(function(err) {
                if (err) {
                    return fn(err);
                }
                fn(null,true);
            });
        }
    }
    function _rollback() {
        return function(fn) {
            _connection.rollback(function() {
                fn(null,true);
            });
        }
    }

    function *connect(db) {
        _db = db;
        yield _connect();
    }
    function *release() {
        yield _release();
    }
    function *execute(sql,params) {
        var start = new Date().getTime();
        var res = yield _excute(sql,params);
        var duration = new Date().getTime() - start;
        console.info('duration: ' + duration + ' ms\t SQL: ' + sql,'params:',params);
        return res;
    }
    function *begin() {
        var sql = 'BEGIN';
        var res = yield execute(sql);
        return res;
    }
    function *commit() {
        var sql = 'COMMIT';
        var res = yield execute(sql);
        return res;
    }
    function *rollback() {
        var sql = 'ROLLBACK';
        var res = yield execute(sql);
        return res;
    }
    return {
        connect : connect,
        begin : begin,
        execute : execute,
        commit : commit,
        rollback : rollback,
        release : release
    }
};
