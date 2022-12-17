const Todo = require("../models/todo.model");

exports.home = (req, res) => {
	res.status(204).send("v1 api home");
};

exports.createNewTodo = async (req, res) => {
	try {
		const todoGroup = req.body.todogroup;
		if (!todoGroup) res.status(406).send("Todo group name is required");
		const newTodoGroup = await Todo.create({
			todoGroup,
			task: [],
		});
		if (!newTodoGroup) res.status(501).send("Unable to create new task group");
		res.status(201).json(newTodoGroup);
	} catch (error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}
};

exports.deleteTodo = async (req, res) => {
	try {
		const result = await Todo.findByIdAndDelete(req.params.todoid);
		if (!result) res.status(501).send("Unable to delete Todo");
		res.send(200).send("Task deleted");
	} catch (error) {
		res.send(500).send(error.message);
	}
};

exports.getAllTodos = async (req, res) => {
	try {
		const todoList = await Todo.find();
		res
			.status(200)
			.send(todoList.length === 0 ? "No todos available" : todoList);
	} catch (error) {
		res.status(500).send(error.message);
	}
};
