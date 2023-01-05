import Heading from "./components/Heading";
import ListTodo from "./components/ListTodo";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

function App() {
	const [user, setUser] = useState({});

	const fetchUser = () => {
		try {
			const token = Cookies.get("token");
			setUser(jwt_decode(token));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => fetchUser(), []);
	return (
		<div>
			<Heading />
			{Object.keys(user).length ? (
				<ListTodo />
			) : (
				<h1 className="display-5 text-center">
					Please <a href="/login">login</a> to see todos
				</h1>
			)}
		</div>
	);
}

export default App;
