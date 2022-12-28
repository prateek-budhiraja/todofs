const express = require("express");
const router = express.Router();

// import controllers
const {
	home,
	createTodo,
	deleteTodo,
	getAllTodos,
	addTask,
	deleteTask,
	editTask,
	editTodo,
} = require("../controllers/todo.controller");

router.get("/", home);
router.post("/createtodo", createTodo);
router.delete("/deletetodo/:todoid", deleteTodo);
router.get("/getalltodos", getAllTodos);
router.post("/edittodo/:todoid", editTodo);

router.post("/addtask/:todoid", addTask);
router.post("/deletetask/:todoid-:index", deleteTask);
router.post("/edittask/:todoid-:index", editTask);

module.exports = router;
