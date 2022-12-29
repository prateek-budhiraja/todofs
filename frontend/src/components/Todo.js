import React from "react";
import { Accordion } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { BiNoEntry } from "react-icons/bi";
import req from "../utils/request";

import axios from "axios";

export default function ({ todo, index, handleAction }) {
	return (
		<Accordion.Item eventKey={index}>
			<Accordion.Header className={"fs-2 d-flex justify-content-between"}>
				{todo.name.toUpperCase()}
			</Accordion.Header>
			<Accordion.Body>
				<div className={"d-flex gap-4 justify-content-center mb-3"}>
					<FaPlus
						className={"text-success fs-4"}
						onClick={() =>
							handleAction({
								action: req.CREATE_TASK,
								todoid: todo._id,
							})
						}
					/>
					<FaEdit
						className={"text-warning fs-4"}
						onClick={() =>
							handleAction({
								action: req.EDIT_TODO,
								todoid: todo._id,
							})
						}
					/>
					<FaTrash
						className={"text-danger fs-4"}
						onClick={() =>
							handleAction({
								todoid: todo._id,
								action: req.DELETE_TODO,
							})
						}
					/>
				</div>
				{todo.task.map((task, index) => (
					<div
						className={"d-flex gap-4 justify-content-end"}
						id={"todo-operations"}
						key={index}
					>
						<span className={"flex-fill"}>
							{task[0].toUpperCase() + task.slice(1)}
						</span>
						<FaEdit
							className={"text-warning fs-4"}
							onClick={() =>
								handleAction({
									action: req.EDIT_TASK,
									todoid: todo._id,
									index: index,
								})
							}
						/>
						<BiNoEntry
							className={"text-danger fs-4"}
							onClick={() =>
								handleAction({
									action: req.DELETE_TASK,
									todoid: todo._id,
									index: index,
								})
							}
						/>
					</div>
				))}
			</Accordion.Body>
		</Accordion.Item>
	);
}
