const User = require("../models/user.model");
const { asyncHandler } = require("../services/asyncHandler");
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
 * @LOGIN
 * @REQUEST_TYPE GET
 * @route http://localhost:4000/api/auth/login
 * @description Login api
 * @parameters email, password
 * @returns
 **************************************************/
