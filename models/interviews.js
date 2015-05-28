var mongoose = require("mongoose");


var interviewSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true
	}
});


var Interview = mongoose.model("Interview", interviewSchema);
module.exports.Interview = Interview;
module.exports.interviewSchema = interviewSchema;