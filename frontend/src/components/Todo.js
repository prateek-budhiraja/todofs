import React from "react";
import { Accordion, ListGroup } from "react-bootstrap";

export default function ({ todo, index }) {
	return (
		<Accordion.Item eventKey={index}>
			<Accordion.Header>{todo.name}</Accordion.Header>
			<Accordion.Body>
				{todo.task.map((task) => (
					<div>
						<span>{task}</span>
						<button>Edit</button>
						<button>delete</button>
					</div>
				))}
			</Accordion.Body>
		</Accordion.Item>
	);
}

{
	/* <ListGroup>
	<ListGroup.Item>Cras justo odio</ListGroup.Item>
	<ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
	<ListGroup.Item>Morbi leo risus</ListGroup.Item>
	<ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
	<ListGroup.Item>Vestibulum at eros</ListGroup.Item>
</ListGroup>; */
}
