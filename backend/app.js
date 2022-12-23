require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");

// Routes
const v1todo = require("./routes/v1todo.route");

// Connection with DB
const dbConnect = require("./config/database.connection");
dbConnect();

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// custom router middleware
app.use("/v1", v1todo);

module.exports = app;
