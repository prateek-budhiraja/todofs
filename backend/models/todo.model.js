const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
	name: {
		type: String,
		require: [true, "Todo should have a name"],
	},
	task: {
		type: [String],
	},
});

module.exports = mongoose.model("todo", todoSchema);
