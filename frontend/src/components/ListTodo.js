import axios from "axios";
import React, { useEffect, useState } from "react";

axios.defaults.baseURL = "http://localhost:4000/";

export default function ListTodo() {
	const [todos, setTodos] = useState([]);

	const fetchTodos = async () => {
		const result = await axios.get("/v1/getalltodos");
		setTodos(result.data);
		console.log(result.data);
	};

	const handleTodoDelete = async (todoid) => {
		const result = await axios.delete(`/v1/deletetodo/${todoid}`);
		console.log(result);
		fetchTodos();
	};

	const handleTodoEdit = async (todoid) => {
		const newTodoName = prompt("Enter a new todo name");
		const data = {
			todogroup: newTodoName,
		};
		const result = await axios.post(`/v1/edittodo/${todoid}`, data);
		fetchTodos();
	};

	const handleTaskEdit = async (todoid, index) => {
		const editedtask = prompt("Enter a new task name");
		const result = await axios.post(`/v1/editTask/${todoid}-${index}`, {
			editedtask,
		});
		fetchTodos();
	};

	const handleTaskDelete = async (todoid, index) => {
		const result = await axios.post(`/v1/deletetask/${todoid}-${index}`);
		fetchTodos();
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	return (
		<>
			{todos.map((todo) => (
				<div>
					<h3>
						{todo.todoGroup}{" "}
						<button onClick={() => handleTodoEdit(todo._id)}>Edit</button>
						<button onClick={() => handleTodoDelete(todo._id)}>Delete</button>
					</h3>
					{todo.task.map((t, index) => (
						<p>
							{t}
							<button onClick={() => handleTaskEdit(todo._id, index)}>
								Edit
							</button>
							<button onClick={() => handleTaskDelete(todo._id, index)}>
								Delete
							</button>
						</p>
					))}
				</div>
			))}
		</>
	);
}
