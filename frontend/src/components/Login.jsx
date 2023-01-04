import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const loginUser = async (e) => {
		e.preventDefault();
		try {
			const result = await axios.post("/auth/login", {
				email: user.email,
				password: user.password,
			});
			Cookies.set("token", result.data.token);
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
