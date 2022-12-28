const Todo = require("../models/todo.model");
const service = require("../services/asyncHandler");
const {
	UnexpectedError,
	PropertyRequiredError,
} = require("../utils/CustomError");

/**************************************************
 * @HOME
 * @REQUEST_TYPE GET
 * @route http://localhost:4000/api/home
 * @description Home route for API
 * @parameters
 * @returns
 **************************************************/
exports.home = (_req, res) => {
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
exports.createTodo = service.asyncHandler(async (req, res) => {
	const { name } = req.body;
	if (!name) {
		throw new PropertyRequiredError("Todo Name");
	}
	const todo = await Todo.create({
		name,
		task: [],
	});

	if (!todo) {
		throw new UnexpectedError("Unable to create new Todo");
	}

	res.status(200).json({
		success: true,
		todo,
	});
});

/**************************************************
 * @DELETE_TODO
 * @REQUEST_TYPE DELETE
 * @route http://localhost:4000/api/deletetodo/:todoid
 * @description Delete a Todo
 * @parameters todoid
 * @returns Success message
 **************************************************/
exports.deleteTodo = service.asyncHandler(async (req, res) => {
	const todoToDelete = await Todo.findByIdAndDelete(req.params.todoid);
	if (!todoToDelete) {
		throw new UnexpectedError("Unable to delete Todo");
	}

	res.status(200).json({
		success: true,
		message: `Todo Deleted - ${todoToDelete.name}`,
	});
});

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
 * @GET_SORT_TODOS
 * @REQUEST_TYPE GET
 * @route http://localhost:4000/api/getsorttodos
 * @description Fetch all Todos - sorted
 * @parameters sortBy, ?direction
 * @returns Array of Todo Objects
 **************************************************/
exports.getSortTodos = service.asyncHandler(async (req, res) => {
	const { sortBy, direction = 1 } = req.query;
	if (!sortBy) {
		throw new PropertyRequiredError("SORT BY");
	}
	const todos = await Todo.find().sort({ [sortBy]: direction });
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
 * @description Edit a Todo
 * @parameters name, todoid
 * @returns Edited Todo Object
 **************************************************/
exports.editTodo = service.asyncHandler(async (req, res) => {
	const { name } = req.body;
	if (!name) {
		throw new PropertyRequiredError("Edited Todo Name");
	}
	const updatedTodo = await Todo.findByIdAndUpdate(
		req.params.todoid,
		{
			name,
		},
		{ new: true }
	);

	if (!updatedTodo) {
		throw new UnexpectedError("Unable to edit todo name");
	}

	res.status(200).json({
		success: true,
		updatedTodo,
	});
});

/**************************************************
 * @ADD_TASK
 * @REQUEST_TYPE POST
 * @route http://localhost:4000/api/addtask/:todoid
 * @description Adds a new task in todo
 * @parameters taskName, todoid
 * @returns Updated Todo Object
 **************************************************/
exports.addTask = service.asyncHandler(async (req, res) => {
	const { taskName } = req.body;

	if (!taskName) {
		throw new PropertyRequiredError("Task Name");
	}
	const updatedTodo = await Todo.findByIdAndUpdate(
		req.params.todoid,
		{
			$push: { task: taskName },
		},
		{ new: true }
	);

	if (!updatedTodo) {
		throw new UnexpectedError("Unable to add task to todo");
	}

	res.status(200).json({
		success: true,
		updatedTodo,
	});
});

/**************************************************
 * @DELETE_TASK
 * @route http://localhost:4000/api/deletetask/:todoid-:index
 * @REQUEST_TYPE POST
 * @description Deletes a task from todo
 * @parameters todoid, index
 * @returns Updated Todo Object
 **************************************************/
exports.deleteTask = service.asyncHandler(async (req, res) => {
	const todoToBeUpdated = await Todo.findById(req.params.todoid);

	if (!todoToBeUpdated) {
		throw new PropertyRequiredError("Todo Id is missing/invalid");
	}

	todoToBeUpdated.task.splice(req.params.index, 1);
	const updatedTodo = todoToBeUpdated.save();

	if (!updatedTodo) {
		throw new UnexpectedError("Unable to delete task");
	}

	res.status(200).json({
		success: true,
		todoToBeUpdated,
	});
});

/**************************************************
 * @EDIT_TASK
 * @route http://localhost:4000/api/editTask/:todoid-:index
 * @REQUEST_TYPE POST
 * @description Edits a task
 * @parameters taskName, todoid, index
 * @returns Updated Todo Object
 **************************************************/
exports.editTask = service.asyncHandler(async (req, res) => {
	const { taskName } = req.body;
	if (!taskName) {
		throw new PropertyRequiredError("Task Name");
	}

	const taskToBeUpdated = `task.${req.params.index}`;
	const updatedTodo = await Todo.findByIdAndUpdate(
		req.params.todoid,
		{
			$set: { [taskToBeUpdated]: taskName },
		},
		{ new: true }
	);

	if (!updatedTodo) {
		throw new UnexpectedError("Unable to edit Todo");
	}

	res.status(200).json({
		success: true,
		updatedTodo,
	});
});
