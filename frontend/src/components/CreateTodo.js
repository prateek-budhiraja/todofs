import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import req from "../utils/request";

export default function CreateTodo({ handleAction }) {
	const [todoName, setTodoName] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		handleAction({ name: todoName, action: req.CREATE_TODO });
		setTodoName("");
	};

	return (
		<>
			<h2 className="display-2 text-center">CREATE A NEW TODO</h2>
			<form
				onSubmit={handleSubmit}
				className={"d-flex justify-content-between gap-5 w-75 m-auto mt-5"}
			>
				<input
					type="text"
					placeholder="Enter Todo Name"
					value={todoName}
					className={
						"flex-fill rounded-pill border-1 border-opacity-10 p-3 fs-5"
					}
					onChange={(ev) => setTodoName(ev.target.value)}
				/>
				<button type="submit" className={"bg-transparent border-0"}>
					<FaPlus className={"fs-1"} />
				</button>
			</form>
		</>
	);
}
