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
