const mongoose = require("mongoose");
const dbConnect = () => {
	mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((conn) => console.log(`Connected to DB: ${conn.connection.host}`))
		.catch((err) => {
			console.log(`Connection to DB failed: ${err.message}`);
			process.exit(1);
		});
};

module.exports = dbConnect;
