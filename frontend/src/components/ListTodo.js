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

	useEffect(() => {
		fetchTodos();
	}, []);

	return (
		<>
			{todos.map((todo) => (
				<div>
					<h3>{todo.todoGroup}</h3>
					{todo.task.map((t) => (
						<p>{t}</p>
					))}
				</div>
			))}
		</>
	);
}
