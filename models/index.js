var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/intervu_app");

module.exports.User = require("./user");