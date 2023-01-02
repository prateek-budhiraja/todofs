import React, { useState } from "react";
import { account } from "../appwrite/appwrite.config";
import { useNavigate } from "react-router-dom";

function Login() {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const loginUser = async (e) => {
		e.preventDefault();
		try {
			await account.createEmailSession(user.email, user.password);
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="Auth-form-container">
			<form className="Auth-form">
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Sign In</h3>
					<div className="text-center">
						Not registered yet?{" "}
						<a className="link-primary" href="/signup">
							Sign Up
						</a>
					</div>
					<div className="form-group mt-3">
						<label>Email address</label>
						<input
							type="email"
							className="form-control mt-1"
							placeholder="Enter email"
							value={user.email}
							onChange={(e) => setUser({ ...user, email: e.target.value })}
						/>
					</div>
					<div className="form-group mt-3">
						<label>Password</label>
						<input
							type="password"
							className="form-control mt-1"
							placeholder="Enter password"
							value={user.password}
							onChange={(e) => setUser({ ...user, password: e.target.value })}
						/>
					</div>
					<div className="d-grid gap-2 mt-3">
						<button
							type="submit"
							className="btn btn-primary"
							onClick={loginUser}
						>
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Login;
