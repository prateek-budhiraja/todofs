const Todo = require("../models/todo.model");
const service = require("../services/asyncHandler");
const { UnexpectedError } = require("../utils/CustomError");

exports.home = (req, res) => {
	res.status(204).send("api home");
};

/**************************************************
 * @CREATE_TODO
 * @REQUEST_TYPE POST
 * @route http://localhost:4000/api/createtodo
 * @description Creates new Todo
 * @parameters name
 * @returns Todo Object
 **************************************************/
exports.createNewTodo = async (req, res) => {
	try {
		const todoGroup = req.body.todogroup;
		if (!todoGroup) return res.status(406).send("Todo group name is required");
		const newTodoGroup = await Todo.create({
			todoGroup,
			task: [],
		});
		if (!newTodoGroup)
			return res.status(501).send("Unable to create new task group");
		return res.status(201).json(newTodoGroup);
	} catch (error) {
		console.log(error.message);
		return res.status(500).send(error.message);
	}
};

/**************************************************
 * @DELETE_TODO
 * @REQUEST_TYPE DELETE
 * @route http://localhost:4000/api/deletetodo/:todoid
 * @description Delete a Todo
 * @parameters todoid
 * @returns Success message
 **************************************************/
exports.deleteTodo = async (req, res) => {
	try {
		const result = await Todo.findByIdAndDelete(req.params.todoid);
		if (!result) return res.status(501).send("Unable to delete Todo");
		return res.status(200).send("Todo deleted");
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

/**************************************************
 * @GET_ALL_TODOS
 * @REQUEST_TYPE GET
 * @route http://localhost:4000/api/getalltodos
 * @description Fetch all Todos
 * @parameters
 * @returns Array of Todo Objects
 **************************************************/
exports.getAllTodos = service.asyncHandler(async (_req, res) => {
	const todos = await Todo.find();
	if (!todos) {
		throw new UnexpectedError("Unable to fetch Todos");
	}
	res.status(200).json({
		success: true,
		todos,
	});
});

/**************************************************
 * @EDIT_TODO
 * @REQUEST_TYPE POST
 * @route http://localhost:4000/api/edittodo/:todoid
 * @description Creates new Todo
 * @parameters name, todoid
 * @returns Edited Todo Object
 **************************************************/
exports.editTodo = async (req, res) => {
	try {
		const updatedName = req.body.todogroup;
		if (!updatedName)
			return res.status(400).send("Unable to fetch new todo name");
		const updatedTodo = await Todo.findByIdAndUpdate(req.params.todoid, {
			todoGroup: updatedName,
		});
		if (!updatedTodo)
			return res.status(501).send("Unable to update todo group name");
		return res.status(200).json(updatedTodo);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

/**************************************************
 * @ADD_TASK
 * @REQUEST_TYPE POST
 * @route http://localhost:4000/api/addtask/:todoid
 * @description Adds a new task in todo
 * @parameters name, todoid
 * @returns Updated Todo Object
 **************************************************/
exports.addTask = async (req, res) => {
	try {
		const todoToBeUpdated = await Todo.findById(req.params.todoid);
		if (!todoToBeUpdated)
			return res.status(404).send("Adding task failed, todo not found");
		todoToBeUpdated.task.push(req.body.newtask);
		const updatedTodo = await todoToBeUpdated.save();
		if (!updatedTodo) return res.status(501).send("Adding task failed");
		res.status(200).json(updatedTodo);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

/**************************************************
 * @DELETE_TASK
 * @route http://localhost:4000/api/deletetask/:todoid-:index
 * @REQUEST_TYPE POST
 * @description Deletes a task from todo
 * @parameters todoid, index
 * @returns Updated Todo Object
 **************************************************/
exports.deleteTask = async (req, res) => {
	try {
		const todoToBeUpdated = await Todo.findById(req.params.todoid);
		if (!todoToBeUpdated)
			return res
				.status(501)
				.send("Unable to fetch todo and task to be deleted");
		todoToBeUpdated.task.splice(req.params.index, 1);
		const updatedTodo = await todoToBeUpdated.save();
		if (!updatedTodo) return res.status(501).send("Unable to delete task");
		return res.status(200).send("Task deleted");
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

/**************************************************
 * @EDIT_TODO
 * @route http://localhost:4000/api/editTask/:todoid-:index
 * @REQUEST_TYPE POST
 * @description Edits a task
 * @parameters name, todoid, index
 * @returns Updated Todo Object
 **************************************************/
exports.editTask = async (req, res) => {
	try {
		const result = await Todo.findById(req.params.todoid);
		if (!result) return res.status(501).send("Unable to fetch task");
		result.task[req.params.index] = req.body.editedtask;
		const updatedTodo = await result.save();
		if (!updatedTodo) return res.status(501).send("Unable to edit task");
		return res.status(200).json(updatedTodo);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};
