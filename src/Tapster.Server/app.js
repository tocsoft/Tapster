
//start server ?
var argv = require('yargs').argv;

if (argv.server) {
    require('./server');
} else {
    require('./cli');
}



//start pump

