const asyncHandler = (fn) => async (req, res, next) => {
	try {
		await fn(req, res, next);
	} catch (err) {
		res.status(er.code || 500).json({
			success: false,
			message: err.message,
		});
	}
};

exports.asyncHandler = asyncHandler;
