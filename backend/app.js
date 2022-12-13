const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.status(204).send("Welcome to the backend");
});

module.exports = app;
