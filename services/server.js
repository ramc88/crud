const debug = require('debug')('2-layers:server');
const http = require('http');
const app = require('../app');
const mongo = require('../startup/mongo');
const passport = require('passport');


/**
* Read port from environment, else set 4000
*/

const port = process.env.PORT || '4000';
app.set('port', port);


/**
 * Create server and listen on provided port.
 */

const server = http.createServer(app);
server.listen(port);

/**
 * Connect to mongo instance
 */

mongo.init();