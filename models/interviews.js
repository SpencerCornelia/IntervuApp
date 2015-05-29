var mongoose = require("mongoose");


var interviewSchema = new mongoose.Schema({
	albumName: {
		type: String,
		required: true
	},
	artist: {
		type: String,
		required: true
	},
	albumPic: {
		type: String,
		required: true
	},
	video1: {
		type: String,
		required: true
	},
	video2: {
		type: String,
		required: true
	}
});


var Interview = mongoose.model("Interview", interviewSchema);
module.exports.Interview = Interview;
module.exports.interviewSchema = interviewSchema;