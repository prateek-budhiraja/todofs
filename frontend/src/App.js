import Heading from "./components/Heading";
import ListTodo from "./components/ListTodo";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
			{/* <Heading />
			<ListTodo /> */}
		</BrowserRouter>
	);
}

export default App;
