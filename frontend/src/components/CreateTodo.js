import React, { useState } from "react";
import axios from "axios";

export default function CreateTodo() {
	const [todogroup, setTodogroup] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		setTodogroup("");
		submitData();
	};

	const submitData = async () => {
		const data = {
			todogroup,
		};
		const res = await axios.post("/v1/createtodo", data);
		console.log(res);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Enter todo name"
				value={todogroup}
				onChange={(ev) => setTodogroup(ev.target.value)}
			/>
			<button type="submit">Create new todo</button>
		</form>
	);
}
