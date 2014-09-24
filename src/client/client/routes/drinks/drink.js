/// <reference path="../../app.js" />

/*
* GET drink list page.
*/

var drinks = require("./data");

exports.configure = function (app) {
    app.get("/drinks/:drink", function (req, res) {
        
        var drink = req.params.drink;
        if (drinks[drink]) {
            res.json(drinks[drink]);
        }
        
        res.status(404).send({ error : "drink not found" });
    });
};