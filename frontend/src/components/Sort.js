import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import req from "../utils/request";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

export default function Sort({ handleAction }) {
	const [direction, setDirection] = useState(-1);
	const [sortBy, setSortBy] = useState("createdAt");
	return (
		<div className="d-flex justify-content-end mb-4 mx-5 align-items-center gap-3">
			<Dropdown>
				<Dropdown.Toggle variant="dark" id="dropdown-basic" size="md">
					Sort
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item
						onClick={async () => {
							await setSortBy("name");
							handleAction({
								action: req.SORT,
								sortBy,
								direction,
							});
						}}
					>
						By Name
					</Dropdown.Item>
					<Dropdown.Item
						onClick={() => {
							setSortBy("createdAt");
							handleAction({
								action: req.SORT,
								sortBy,
								direction,
							});
						}}
					>
						By Date Created
					</Dropdown.Item>
					<Dropdown.Item
						onClick={() => {
							setSortBy("updatedAt");
							handleAction({
								action: req.SORT,
								sortBy,
								direction,
							});
						}}
					>
						By Date Edited
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			{direction === 1 ? (
				<FaSortAmountUp
					className="fs-3"
					onClick={() => {
						setDirection(-1);
						handleAction({
							action: req.SORT,
							sortBy,
							direction,
						});
					}}
				/>
			) : (
				<FaSortAmountDown
					className="fs-3"
					onClick={() => {
						setDirection(1);
						handleAction({
							action: req.SORT,
							sortBy,
							direction,
						});
					}}
				/>
			)}
		</div>
	);
}
