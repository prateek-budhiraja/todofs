require("dotenv").config();

const express = require("express");
const app = express();

// Routes
const v1todo = require("./routes/v1todo.route");

// Connection with DB
const dbConnect = require("./config/database.connection");
dbConnect();

app.use("/v1", v1todo);

module.exports = app;
