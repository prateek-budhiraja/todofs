require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");

// Routes
const todo = require("./routes/todo.route");
const auth = require("./routes/auth.route");

// Connection with DB
const dbConnect = require("./config/database.connection");
dbConnect();

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// custom router middleware
app.use("/api", todo);
app.use("/api/auth", auth);

module.exports = app;
