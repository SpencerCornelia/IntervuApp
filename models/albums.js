var mongoose = require("mongoose");
var interviewSchema = require("./interviews").interviewSchema;

var albumSchema = new mongoose.Schema({
	albumPic: {
		type: String,
		required: true
	},
	artist: {
		type: String,
		required: true
	},
	albumName: {
		type: String,
		required: true
	},
	// interviews: [interviewSchema]
	video1: {
		type: String,
		required: true
	},
	video2: {
		type: String,
		required: true
	}
});




var Album = mongoose.model("Album", albumSchema);

module.exports = Album;