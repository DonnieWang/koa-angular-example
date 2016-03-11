/**
 * Created by donnie on 16/3/11.
 */

var monent = require('moment');

exports.formatData = function(date,format) {
    return monent(date).format(format);
};
