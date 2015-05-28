var mongoose = require("mongoose");
var interviewSchema = require("./interviews").interviewSchema;

var albumSchema = new mongoose.Schema({
	albumPic: {
		type: String,
		required: true,
	},
	artist: {
		type: String,
		required: true
	},
	albumName: {
		type: String,
		required: true
	},
	interviews: [interviewSchema]
});




var Album = mongoose.model("Album", albumSchema);

module.exports = Album;