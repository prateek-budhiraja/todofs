import Heading from "./components/Heading";
import ListTodo from "./components/ListTodo";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { account } from "./appwrite/appwrite.config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function App() {
	const navigate = useNavigate();
	const [userDetails, setUserDetails] = useState();

	useEffect(() => {
		const getUser = account.get();
		getUser.then(
			function (response) {
				setUserDetails(response);
			},
			function (err) {
				console.log(err);
			}
		);
	}, []);

	const logout = async () => {
		try {
			await account.deleteSession("current");
			navigate("/login");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Heading />
			{userDetails ? (
				<ListTodo />
			) : (
				<h1 className="text-center mt-5">
					Please <a href="/login">login</a> to view todos
				</h1>
			)}
		</>
	);
}

export default App;
