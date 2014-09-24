
exports.configure = function (app) {
    /*
    * GET home page.
    */
   app.get('/content/*', function (req, res) {
        
        var path = req.params[0] ? req.params[0] : 'index.html';
        res.sendfile(path, { root: './bower_components' });
    });

};