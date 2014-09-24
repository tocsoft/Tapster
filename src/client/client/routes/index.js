
var bower = require("./bower");
var home = require("./home");
var drinks = require("./drinks");
var singleDrink = require("./drinks/drink");

exports.configure = function (app) {
    bower.configure(app);
    home.configure(app);
    drinks.configure(app);
    singleDrink.configure(app);
}