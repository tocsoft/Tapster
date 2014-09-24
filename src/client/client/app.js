
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var justhtml = require('justhtml');
var lessMiddleware = require('less-middleware');

var app = express();
global.app = app;



// all environments
app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set("view options", { layout: false });
app.engine('html', justhtml.__express);
app.set('view engine', 'html');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(lessMiddleware(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


var routes = require('./routes');

routes.configure(app);



http.createServer(app).listen(app.get('port'), function (){
  console.log('Express server listening on port ' + app.get('port'));
});
