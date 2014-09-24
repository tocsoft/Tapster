/// <reference path="../../app.js" />

/*
* GET drink list page.
*/

var drinks = require("./data");


exports.configure = function (app) {
    app.get("/drinks", function (req, res) {
        res.json(drinks);
    });
}