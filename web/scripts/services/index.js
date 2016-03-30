var $ = require('jquery');

module.exports = function(app) {

    require('./login')(app);

    require('./doctor')(app);

    require('./patient')(app);

};
