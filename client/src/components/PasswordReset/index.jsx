import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import  "./styles.css";
import ScaleLoader from "react-spinners/ScaleLoader";


const PasswordReset = () => {
	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const param = useParams();
	const url = `http://localhost:4000/api/password-reset/${param.id}/${param.token}`;

	useEffect(() => {
		const verifyUrl = async () => {
			try {
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param, url]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { data } = await axios.post(url, { password });
			setMsg(data.message);
			setError("");
			window.location = "/login";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
				setLoading(false)
			}
		}
	};

	return (
		<Fragment>
			{validUrl ? (
				
				<div className={"resetContainer"}>
					{!loading?
					<form className={"form_resetContainer"} onSubmit={handleSubmit}>
						<h1>Add New Password</h1>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							className={"input"}
						/>
						{error && <div className={"error_msg"}>{error}</div>}
						{msg && <div className={"success_msg"}>{msg}</div>}
						<button disabled={loading} type="submit" className={"green_btn"}>
							Submit
						</button>
					</form>:  <ScaleLoader color="#3d49fc" size="150"  />}
				</div>
			) : (
				<div className={"resetContainer"}>
				<h1 className="text-red-400 text-xl font-bold items-center">404 Not Found</h1>
				</div>
			)}
		</Fragment>
	);
};

export default PasswordReset;
