import axios from "axios";
import React, { useEffect, useState } from "react";
import Todo from "./Todo";

import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion } from "react-bootstrap";

axios.defaults.baseURL = "http://localhost:4000/api";

export default function ListTodo() {
	const [todos, setTodos] = useState([]);

	const fetchTodos = async () => {
		const result = await axios.get("/getalltodos");
		setTodos(result.data.todos);
		console.log(result.data.todos);
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	return (
		<>
			<Accordion defaultActiveKey="">
				{todos.map((todo, index) => (
					<Todo todo={todo} index={index} />
				))}
			</Accordion>
		</>
	);
}

// <div>
// 	<h3>
// 		{todo.todoGroup}{" "}
// 		<button onClick={() => handleTodoEdit(todo._id)}>Edit</button>
// 		<button onClick={() => handleTodoDelete(todo._id)}>Delete</button>
// 		<button onClick={() => handleAddTask(todo._id)}>Add task</button>
// 	</h3>
// 	{todo.task.map((t, index) => (
// 		<p>
// 			{t}
// 			<button onClick={() => handleTaskEdit(todo._id, index)}>
// 				Edit
// 			</button>
// 			<button onClick={() => handleTaskDelete(todo._id, index)}>
// 				Delete
// 			</button>
// 		</p>
// 	))}
// </div>

// const handleTodoDelete = async (todoid) => {
// 	const result = await axios.delete(`/deletetodo/${todoid}`);
// 	console.log(result);
// 	fetchTodos();
// };

// const handleTodoEdit = async (todoid) => {
// 	const newTodoName = prompt("Enter a new todo name");
// 	const data = {
// 		todogroup: newTodoName,
// 	};
// 	const result = await axios.post(`/edittodo/${todoid}`, data);
// 	fetchTodos();
// };

// const handleTaskEdit = async (todoid, index) => {
// 	const editedtask = prompt("Enter a new task name");
// 	const result = await axios.post(`/editTask/${todoid}-${index}`, {
// 		editedtask,
// 	});
// 	fetchTodos();
// };

// const handleTaskDelete = async (todoid, index) => {
// 	const result = await axios.post(`/deletetask/${todoid}-${index}`);
// 	fetchTodos();
// };

// const handleAddTask = async (todoid) => {
// 	const newtask = prompt("Enter a new task");
// 	const result = await axios.post(`/addtask/${todoid}`, {
// 		newtask,
// 	});
// 	fetchTodos();
// };
