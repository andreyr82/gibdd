/**
 * Created by andrey on 13.01.15.
 */
var nconf = require('nconf');

nconf.argv().env().file({ file: __dirname + '/config.json' });

module.exports = nconf;