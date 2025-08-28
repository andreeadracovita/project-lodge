import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "react-bootstrap-icons";

import { checkUserExists } from "api/AuthenticationApiService";
import { createAccount } from "api/AuthenticationApiService";
import FormError from "components/common/FormError";
import PasswordInput from "components/common/PasswordInput";
import { useAuth } from "components/security/AuthContext";

const FormState = {
	Email: "Email",
	Password: "Password",
	Signup: "Signup",
} as const;
type FormState = (typeof FormState)[keyof typeof FormState];

export default function SignupLogin() {
	const navigate = useNavigate();
	const authContext: any = useAuth();
	const location = useLocation();

	const [formState, setFormState] = useState<FormState>(FormState.Email);
	const [input, setInput] = useState({
		email: "",
		firstName: "",
		lastName: "",
		password: ""
	});
	const [errors, setErrors] = useState<string[]>([]);

	function onBackClicked() {
		setFormState(FormState.Email);
		setErrors([]);
	}

	async function onContinueClicked() {
		checkUserExists({ email: input.email })
			.then(response => {
				if (response.data.errors) {
					setErrors(response.data.errors);
					return;
				}

				if (response.data?.userExists) {
					setFormState(FormState.Password);
				} else {
					setFormState(FormState.Signup);
				}
				setErrors([]);
			})
			.catch(error => {
				console.error(error);
			});
	}

	function handleChange(event: any) {
		const { value, name } = event.target;

		setInput((prevValue: any) => {
			return {
				...prevValue,
				[name]: value
			}
		});
	}

	async function handleLogin() {
		if (await authContext.login(input.email, input.password)) {
			navigate(location?.pathname || "/");
		} else {
			setErrors(["Incorrect email and password combination"]);
		}
	}

	async function onFormSubmit(event: any) {
		event.preventDefault();

		if (formState === FormState.Password) {
			// Log in
			handleLogin();
		} else if (formState === FormState.Signup) {
			// Sign up
			const payload = {
				email: input.email,
				password: input.password,
				first_name: input.firstName,
				last_name: input.lastName
			};
			createAccount(payload)
				.then(response => {
					if (response.data.errors) {
						setErrors(response.data.errors);
						return;
					}
					handleLogin();
				})
				.catch(error => {
					console.error(error);
				})
		}
	}

	return (
		<div className="container d-flex justify-content-center align-items-center section-container">
			<div className="sign-in-container border-section p-3">
				<div className="row mb-3 border-bottom">
					<div className="col-2">
						{
							(formState === FormState.Signup || formState === FormState.Password) &&
							<div className="cursor-pointer" onClick={onBackClicked}><ChevronLeft /></div>
						}
					</div>
					<div className="col-8">
						{
							formState === FormState.Email &&
							<h1 className="page-heading text-center">Sign up or log in</h1>
						}
						{
							formState === FormState.Signup &&
							<h1 className="page-heading text-center">Create an account</h1>
						}
						{
							formState === FormState.Password &&
							<h1 className="page-heading text-center">Log in</h1>
						}
					</div>
				</div>

				<form onSubmit={onFormSubmit}>
				{
					formState === FormState.Email &&
					<div>
						<h2 className="section-heading">Welcome to Lodge</h2>
						<input
							type="text"
							className="form-control mt-10"
							name="email"
							value={input.email} 
							onChange={handleChange}
							placeholder="Email"
							maxLength={50}
							required
						/>
						<FormError errors={errors} />
						<button
							type="button"
							className="btn-pill w-100 section-container"
							onClick={onContinueClicked}
						>
							Continue
						</button>
					</div>
				}
				{
					formState === FormState.Password &&
					<div>
						<h2 className="section-heading">Welcome back</h2>
						<PasswordInput id="password" name="password" value={input.password} handleChange={handleChange} />
						<FormError errors={errors} />
						<button
							type="submit"
							className="btn-pill w-100 section-container"
						>
							Continue
						</button>
					</div>
				}
				{
					formState === FormState.Signup &&
					<div>
						<label htmlFor="first-name" className="section-heading">Legal name</label>
						<input
							id="first-name"
							type="text"
							className="form-control mt-10"
							name="firstName"
							value={input.firstName} 
							onChange={handleChange}
							placeholder="First name *"
							maxLength={50}
							required
						/>
						<input
							type="text"
							className="form-control mt-2"
							name="lastName"
							value={input.lastName} 
							onChange={handleChange}
							placeholder="Last name *"
							maxLength={50}
							required
						/>

						<label htmlFor="email" className="section-heading section-container">Contact info</label>
						<input
							id="email"
							type="text"
							className="form-control mt-10"
							name="email"
							value={input.email}
							onChange={handleChange}
							placeholder="Email *"
							maxLength={50}
							required
						/>

						<label htmlFor="password" className="section-heading section-container">Password</label>
						<PasswordInput
							id="password"
							name="password"
							value={input.password}
							handleChange={handleChange}
						/>
						
						<FormError errors={errors} />
						<button
							type="submit"
							className="btn-pill w-100 section-container"
						>
							Continue
						</button>
					</div>
				}
				</form>
			</div>
		</div>
	);
}
