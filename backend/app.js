require("dotenv").config();

const express = require("express");
const app = express();
const v1todo = require("./routes/v1todo.route");

app.use("/v1", v1todo);

module.exports = app;
