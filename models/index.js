var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/intervu_app");

module.exports.User = require("./user");
module.exports.Album = require("./albums");
module.exports.Interview = require("./interviews").Interview;