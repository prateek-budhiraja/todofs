class PropertyRequiredError extends Error {
	constructor(message) {
		super("Invalid request **" + message + "** is required");
		this.code = 403;
	}
}

class UnexpectedError extends Error {
	constructor(message) {
		super("Something went wrong: " + message);
		this.code = 503;
	}
}

module.exports = { PropertyRequiredError, UnexpectedError };
