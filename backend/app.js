const express = require("express");
const app = express();
const v1 = require("./routes/v1todo.route");

app.use("/v1", v1);

module.exports = app;
