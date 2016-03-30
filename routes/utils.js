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
