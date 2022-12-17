const express = require("express");
const router = express.Router();

// import controllers
const {
	home,
	createNewTodo,
	deleteTodo,
	getAllTodos,
} = require("../controllers/v1todo.controller");

router.get("/", home);
router.post("/createtodo", createNewTodo);
router.delete("/deletetodo/:todoid", deleteTodo);
router.get("/getalltodos", getAllTodos);

module.exports = router;
