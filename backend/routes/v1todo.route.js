const express = require("express");
const router = express.Router();

// import controllers
const {
	home,
	createNewTodo,
	deleteTodo,
	getAllTodos,
	addTask,
	deleteTask,
	editTask,
	editTodo,
} = require("../controllers/v1todo.controller");

router.get("/", home);
router.post("/createtodo", createNewTodo);
router.delete("/deletetodo/:todoid", deleteTodo);
router.get("/getalltodos", getAllTodos);
router.post("/edittodo/:todoid", editTodo);

router.post("/addtask/:todoid", addTask);
router.post("/deletetask/:todoid-:index", deleteTask);
router.post("/editTask/:todoid-:index", editTask);

module.exports = router;
