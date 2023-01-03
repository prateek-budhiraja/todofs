const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

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
		select: false,
	},
});

// encrypt the password when creating user
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

// more functionality to user schema
userSchema.methods = {
	// compare encrypted password
	comparePassword: async function (plainPassword) {
		return await bcrypt.compare(plainPassword, this.password);
	},

	// generate jwt token
	getJwtToken: async function () {
		return JWT.sign(
			{
				_id: this._id,
				email: this.email,
			},
			// config.JWT_SECRET,
			"hello",
			{
				// expiresIn: config.JWT_EXPIRY,
				expiresIn: "2h",
			}
		);
	},
};

module.exports = mongoose.model("user", userSchema);
