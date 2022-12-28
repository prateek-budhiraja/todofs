require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");

// Routes
const todo = require("./routes/todo.route");

// Connection with DB
const dbConnect = require("./config/database.connection");
dbConnect();

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// custom router middleware
app.use("/api", todo);

module.exports = app;
