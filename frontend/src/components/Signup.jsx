import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Signup() {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});

	const signupUser = async (e) => {
		e.preventDefault();
		const result = await axios.post("/auth/signup", {
			email: user.email,
			password: user.password,
			name: user.name,
		});

		Cookies.set("token", result.data.token);
		if (result) navigate("/");
	};

	return (
		<div className="Auth-form-container">
			<form className="Auth-form">
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Sign Up</h3>
					<div className="text-center">
						Already registered?{" "}
						<a className="link-primary" href="/login">
							Sign In
						</a>
					</div>
					<div className="form-group mt-3">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control mt-1"
							placeholder="e.g Prateek Budhiraja"
							value={user.name}
							onChange={(e) => setUser({ ...user, name: e.target.value })}
						/>
					</div>
					<div className="form-group mt-3">
						<label>Email address</label>
						<input
							type="email"
							className="form-control mt-1"
							placeholder="Email Address"
							value={user.email}
							onChange={(e) => setUser({ ...user, email: e.target.value })}
						/>
					</div>
					<div className="form-group mt-3">
						<label>Password</label>
						<input
							type="password"
							className="form-control mt-1"
							placeholder="Password"
							value={user.password}
							onChange={(e) => setUser({ ...user, password: e.target.value })}
						/>
					</div>
					<div className="d-grid gap-2 mt-3">
						<button
							type="submit"
							className="btn btn-primary"
							onClick={signupUser}
						>
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Signup;
