const User = require("../models/user.model");
const { asyncHandler } = require("../services/asyncHandler");
const cookieOptions = require("../utils/cookieOptions");
const {
	PropertyRequiredError,
	UnexpectedError,
} = require("../utils/CustomError");

/**************************************************
 * @HOME
 * @REQUEST_TYPE GET
 * @route http://localhost:4000/api/auth/
 * @description Home route for auth API
 * @parameters
 * @returns
 **************************************************/
exports.home = (_req, res) => {
	res.status(204).send("api home");
};

/**************************************************
 * @SIGNUP
 * @route http://localhost:4000/api/auth/signup
 * @description User signup controller for new user
 * @parameters name, email, password
 * @returns User Object
 **************************************************/
exports.signup = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	if (!(name && email && password)) {
		throw new PropertyRequiredError("Name, Email and Password");
	}

	const existingUser = await User.findOne({ email });

	if (existingUser) {
		throw new UnexpectedError("User already exist");
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (!user) {
		throw new UnexpectedError("Cannot create new user");
	}

	const token = await user.getJwtToken();
	user.password = undefined;

	res.cookie("token", token, cookieOptions);
	res.status(201).json({
		success: true,
		token,
		user,
	});
});

/**************************************************
 * @LOGIN
 * @REQUEST_TYPE GET
 * @route http://localhost:4000/api/auth/login
 * @description Login api
 * @parameters email, password
 * @returns token and user
 **************************************************/
exports.login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!(email && password)) {
		throw new PropertyRequiredError("Email and Password");
	}
	const user = await User.findOne({ email }).select("+password");
	if (!user) {
		throw new UnexpectedError("Cannot Login User");
	}

	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		throw new UnexpectedError("Invalid Credentials");
	}

	const token = await user.getJwtToken();
	user.password = undefined;

	res.cookie("token", token, cookieOptions);
	res.status(200).json({
		success: true,
		token,
		user,
	});
});
