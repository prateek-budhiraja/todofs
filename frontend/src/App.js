import Heading from "./components/Heading";
import ListTodo from "./components/ListTodo";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	return (
		<div>
			<Heading />
			<ListTodo />
		</div>
	);
}

export default App;
