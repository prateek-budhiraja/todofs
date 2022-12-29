import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import req from "../utils/request";

import { Accordion, AccordionButton } from "react-bootstrap";

export default function ListTodo() {
	const [todos, setTodos] = useState([]);

	const fetchTodos = async () => {
		const result = await axios.get("/getalltodos");
		setTodos(result.data.todos);
	};

	const handleAction = async (data) => {
		// handlers based on the action specified
		if (data.action === req.CREATE_TODO) {
			const result = await axios.post("/createtodo", { name: data.name });
		} else if (data.action === req.DELETE_TODO) {
			const result = await axios.delete(`/deletetodo/${data.todoid}`);
		} else if (data.action === req.EDIT_TODO) {
			const newTodoName = prompt("Enter a new todo name");
			const result = await axios.post(`/edittodo/${data.todoid}`, {
				name: newTodoName,
			});
		} else if (data.action === req.CREATE_TASK) {
			const newtask = prompt("Enter a new task");
			const result = await axios.post(`/addtask/${data.todoid}`, {
				taskName: newtask,
			});
		} else if (data.action === req.EDIT_TASK) {
			const editedtask = prompt("Enter a new task name");
			const result = await axios.post(
				`/editTask/${data.todoid}-${data.index}`,
				{
					taskName: editedtask,
				}
			);
		} else if (data.action === req.DELETE_TASK) {
			const result = await axios.post(
				`/deletetask/${data.todoid}-${data.index}`
			);
		}
		fetchTodos();
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	return (
		<>
			<CreateTodo handleAction={handleAction} />

			<h3 className="display-3 text-center mt-5 mb-5">YOUR TODOS</h3>
			<Accordion defaultActiveKey="">
				{todos.map((todo, index) => (
					<Todo
						todo={todo}
						index={index}
						key={index}
						handleAction={handleAction}
					/>
				))}
			</Accordion>
		</>
	);
}
