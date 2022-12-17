const express = require("express");
const router = express.Router();

// import controllers
const { home, createNewTodo } = require("../controllers/v1todo.controller");

router.get("/", home);
router.post("/createtodo", createNewTodo);

module.exports = router;
