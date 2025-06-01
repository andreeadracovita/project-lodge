import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

import { useAuth } from "/src/components/security/AuthContext";
import { checkUserExists } from "/src/components/api/AuthenticationApiService";
import { createAccount } from "/src/components/api/LodgeDbApiService";

function SignupLogin() {
	const navigate = useNavigate();
	const authContext = useAuth();

	const [input, setInput] = useState({
		email: "",
		firstName: "",
		lastName: "",
		password: ""
	});
	const [doesUserExist, setDoesUserExist] = useState(false);

	const [showEmailInput, setShowEmailInput] = useState(true);
	const [showPasswordInput, setShowPasswordInput] = useState(false);
	const [showSignupForm, setShowSignupForm] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState("weak");
	const [showLoginError, setShowLoginError] = useState(false);

	const errorsText = [
		`Password strength: ${passwordStrength}`,
		"Can't contain your name or email address",
		"At least 8 characters",
		"Contains a number or a symbol"
	];

	function onBackClicked() {
		setShowPasswordInput(false);
		setShowSignupForm(false);
		setShowEmailInput(true);
	}

	async function onContinueClicked() {
		try {
			const response = await checkUserExists(input.email);

			if (response.data?.userExists) {
				setShowEmailInput(false);
				setShowPasswordInput(true);
			} else {
				setShowEmailInput(false);
				setShowSignupForm(true);
			}
		} catch (error) {
			console.error(error);
		}
	}

	function handleChange(event) {
		const { value, name } = event.target;
		setShowLoginError(false);

		setInput((prevValue) => {
			return {
				...prevValue,
				[name]: value
			}
		});
	}

	async function handleLogin() {
		if (await authContext.login(input.email, input.password)) {
			setShowLoginError(false);
			navigate("/");
		} else {
			setShowLoginError(true);
		}
	}

	async function onFormSubmit(event) {
		event.preventDefault();

		if (showPasswordInput) {
			// Log in
			handleLogin();
		} else if (showSignupForm) {
			// Sign up
			const payload = {
				email: input.email,
				password: input.password,
				first_name: input.firstName,
				last_name: input.lastName
			};
			createAccount(payload)
				.then(() => {
					handleLogin();
				})
				.catch(error => {
					console.log(error);
				})
		}
	}

	return (
		<div className="container d-flex justify-content-center align-items-center section-container">
			<div className="sign-in-container border-section p-3">
				<div className="row mb-3 border-bottom">
					<div className="col-2">
						{
							(showSignupForm || showPasswordInput) &&
							<div className="cursor-pointer" onClick={onBackClicked}><Icon.ChevronLeft /></div>
						}
					</div>
					<div className="col-8">
						{
							showEmailInput &&
							<h1 className="page-heading text-center">Sign up or log in</h1>
						}
						{
							showSignupForm &&
							<h1 className="page-heading text-center">Create an account</h1>
						}
						{
							showPasswordInput &&
							<h1 className="page-heading text-center">Log in</h1>
						}
					</div>
				</div>

				<form onSubmit={onFormSubmit}>
				{
					showEmailInput &&
					<div>
						<h2>Welcome to Lodge</h2>
						<input
							type="text"
							className="form-control rounded-pill"
							name="email"
							value={input.email} 
							onChange={handleChange}
							placeholder="Email"
						/>
						<button
							type="button"
							className="btn btn-light rounded-pill brand-color-background w-100 mt-3"
							onClick={onContinueClicked}
						>
							Continue
						</button>
					</div>
				}
				{
					showPasswordInput &&
					<div>
						<h2>Welcome back</h2>
						<input
							type="password"
							className="form-control rounded-pill"
							name="password"
							value={input.password}
							onChange={handleChange}
							placeholder="Password"
							autoComplete="off"
						/>
						{
							showLoginError &&
							<div>
								<p style={{"color": "red"}}>Incorrect email and password combination</p>
							</div>
						}
						<button
							type="submit"
							className="btn btn-light rounded-pill brand-color-background w-100 mt-3"
						>
							Continue
						</button>
					</div>
				}
				{
					showSignupForm &&
					<div>
						<h2>Legal name</h2>
						<input
							type="text"
							className="form-control rounded-pill"
							name="firstName"
							value={input.firstName} 
							onChange={handleChange}
							placeholder="First name"
						/>
						<input
							type="text"
							className="form-control rounded-pill mt-2"
							name="lastName"
							value={input.lastName} 
							onChange={handleChange}
							placeholder="Last name"
						/>

						<h2 className="mt-3">Contact info</h2>
						<input
							type="text"
							className="form-control rounded-pill"
							name="email"
							value={input.email} 
							onChange={handleChange}
							placeholder="Email"
						/>

						<h2 className="mt-3">Password</h2>
						<input
							type="password"
							className="form-control rounded-pill"
							name="password"
							value={input.password}
							onChange={handleChange}
							placeholder="Password"
							autoComplete="off"
						/>
						<div className="mt-3">
							{
								errorsText.map((error, i) => 
									<p key={i} className="error-font">
										<Icon.CheckCircleFill size={16} color="green" />
										<Icon.XCircleFill size={16} color="#CC0000" />
										<span className="ms-1">{error}</span>
									</p>
								)
							}
						</div>
						<button
							type="submit"
							className="btn btn-light rounded-pill brand-color-background w-100 mt-3"
						>
							Continue
						</button>
					</div>
				}
				
				
				</form>
				<hr />
				<button type="button" className="btn btn-outline-dark rounded-pill w-100 mt-3">
					<span className="d-flex align-items-center justify-content-center">
						<img src="/icons/Google__G__logo.png" width="18px" height="18px" className="me-1" />
						Continue with Google
					</span>
				</button>
			</div>
		</div>
	);
}

export default SignupLogin;