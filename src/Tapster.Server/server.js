
var argv = require('yargs').argv;

var express = require('express')
var app = express()
var path = require('path');


var pumps = require('./configs/pumps');

function returnStatusList(res) {
    var pumpStatusList = [];
    for (var i in pumps._pumps) {
        var p = pumps._pumps[i];
        pumpStatusList.push({
            name : i,
            status : p.status,
            direction : p.direction
        });
    }
    res.send(pumpStatusList);
}

app.get('/pumps', function (req, res) {
    returnStatusList(res);
});


app.post('/pumps/:action', function (req, res) {
    var action = req.params.action;

    switch (action) {
        case 'forward':
            pumps.forward(function () {
                console.log('all running in forward');
                returnStatusList(res);
            });
            break;
        case 'reverse':
            pumps.reverse(function () {
                console.log('all running in reverse');
                returnStatusList(res);
            });
            break;
        case 'stop':
            pumps.stop(function () {
                console.log('all stopped');
                returnStatusList(res);
            });
            break;
        default:
            res.status(404)// HTTP status 404: NotFound
            .send('Not found');
            break;
    }

});
app.post('/pumps/:name/:action', function (req, res) {
    var name = req.params.name;
    var action = req.params.action;
    var p = pumps._pumps[name];
    
    console.log('posting ', name, action);
    
    var notFound = false;
    if (p) {
        
        switch (action) {
            case 'forward':
                p.forward(function () {
                    console.log('running in forward');
                    res.send({
                        name : name,
                        status : p.status,
                        direction : p.direction
                    });
                });
                break;
            case 'reverse':
                p.reverse(function () {
                    console.log('running in reverse');
                    res.send({
                        name : name,
                        status : p.status,
                        direction : p.direction
                    });
                });
                break;
            case 'stop':
                p.stop(function () {
                    console.log('stopped');
                    res.send({
                        name : name,
                        status : p.status,
                        direction : p.direction
                    });
                });
                break;
            default:
                notFound = true;
                break;
        }
        
    } else {
        notFound = true;
    }
    
    if (notFound) {
        res.status(404)// HTTP status 404: NotFound
            .send('Not found');
    }
});

app.use("/", express.static(path.join(__dirname, 'public')));

var server = app.listen(argv.port || 80, function () {
    
    var host = server.address().address
    var port = server.address().port
    
    console.log('Example app listening at http://%s:%s', host, port)

});