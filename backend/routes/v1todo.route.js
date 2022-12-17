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

router.post("/addTask/:todoid");
router.delete("/deletetask/:todoid-:index");
router.post("/editTask/:todoid-:index");

module.exports = router;
