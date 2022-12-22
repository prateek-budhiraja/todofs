const Todo = require("../models/todo.model");

exports.home = (req, res) => {
	res.status(204).send("v1 api home");
};

// Todo Group controllers

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
		res.send(200).send("Todo deleted");
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

exports.editTodo = async (req, res) => {
	try {
		const updatedName = req.body.todogroup;
		if (!updatedName) res.status(400).send("Unable to fetch new todo name");
		const updatedTodo = await Todo.findByIdAndUpdate(req.params.todoid, {
			todoGroup: updatedName,
		});
		if (!updatedTodo) res.status(501).send("Unable to update todo group name");
		res.status(200).json(updatedTodo);
	} catch (error) {
		res.status(500).send(error.message);
	}
};

// Task controllers

exports.addTask = async (req, res) => {
	try {
		const todoToBeUpdated = await Todo.findById(req.params.todoid);
		if (!todoToBeUpdated)
			res.status(404).send("Adding task failed, todo not found");
		todoToBeUpdated.task.push(req.body.newtask);
		const updatedTodo = await todoToBeUpdated.save();
		if (!updatedTodo) res.status(501).send("Adding task failed");
		res.status(200).json(updatedTodo);
	} catch (error) {
		res.status(500).send(error.message);
	}
};

exports.deleteTask = async (req, res) => {
	try {
		const todoToBeUpdated = await Todo.findById(req.params.todoid);
		if (!todoToBeUpdated)
			res.status(501).send("Unable to fetch todo and task to be deleted");
		todoToBeUpdated.task.splice(req.params.index, 1);
		const updatedTodo = await todoToBeUpdated.save();
		if (!updatedTodo) res.status(501).send("Unable to delete task");
		res.status(200).send("Task deleted");
	} catch (error) {
		res.status(500).send(error.message);
	}
};

exports.editTask = async (req, res) => {
	try {
		const result = await Todo.findById(req.params.todoid);
		if (!result) res.status(501).send("Unable to fetch task");
		result.task[req.params.index] = req.body.editedtask;
		const updatedTodo = await result.save();
		if (!updatedTodo) res.status(501).send("Unable to edit task");
		res.status(200).json(updatedTodo);
	} catch (error) {
		res.status(500).send(error.message);
	}
};
