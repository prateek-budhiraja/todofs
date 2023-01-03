const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name of the User is required"],
		maxLength: [20, "Name of the user cannot be more than 20 characters"],
		minLength: [3, "Name of the user should be minimum 3 characters"],
		trim: true,
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		trim: true,
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
});

module.exports = mongoose.model("user", userSchema);
