import { useEffect, useState } from "react";

import { SettingsSectionEnum } from "../SettingsSectionEnum";
import { formClassNames } from "../FormClassNames";
import { updateUser } from "api/BackendApiService";
import FormError from "components/common/FormError";
import { useAuth } from "components/security/AuthContext";

type NameFormProps = {
	firstNameValue: string | undefined,
	lastNameValue: string | undefined,
	isFocused: boolean,
	showSectionHandler: any,
	clearSectionHandler: any,
	refreshUserData: any
};

export default function NameForm({
	firstNameValue,
	lastNameValue,
	isFocused,
	showSectionHandler,
	clearSectionHandler,
	refreshUserData
}: NameFormProps) {
	const authContext: any = useAuth();
	const [input, setInput] = useState({
		firstName: firstNameValue,
		lastName: lastNameValue
	});
	const [errors, setErrors] = useState<string[]>([]);

	useEffect(() => {
		setInput({
			firstName: firstNameValue,
			lastName: lastNameValue
		});
	}, [firstNameValue, lastNameValue]);

	useEffect(() => {
		if (!isFocused) {
			// Reset state
			setInput({
				firstName: firstNameValue,
				lastName: lastNameValue
			});
		}
	}, [isFocused]);

	function handleChange(event: any): void {
		const { name, value } = event.target;
		setInput(prevVal => {
			return {
				...prevVal,
				[name]: value
			}
		});
	}

	function handleSubmit(event: any): void {
		event.preventDefault();
		updateUser({ first_name: input.firstName, last_name: input.lastName })
			.then(response => {
				const errors = response.data.errors;
				if (errors) {
					setErrors(errors);
					setInput({
						firstName: firstNameValue,
						lastName: lastNameValue
					});
					return;
				}
				clearSectionHandler();
				setErrors([]);
				authContext.setUserConfig();
				refreshUserData();
			})
			.catch((error) => {
				console.error(error);
			});
	}
	
	return (
		<form onSubmit={handleSubmit}>
			<div className="row px-3">
				<div className="col-2">
					<label htmlFor="first-name">Name</label>
				</div>
				<div className="col-8">
					{
						isFocused
						? <>
							<label htmlFor="first-name">First name</label>
							<input id="first-name" name="firstName" value={input.firstName} onChange={handleChange} className={formClassNames} />
	
							<label htmlFor="last-name">Last name</label>
							<input id="last-name" name="lastName" value={input.lastName} onChange={handleChange} className={formClassNames} />

							<FormError errors={errors} />
						</>
						: <>
							<span>{firstNameValue} {lastNameValue}</span>
						</>
					}
					
				</div>
				<div className="col-2 d-flex justify-content-end align-items-start">
					{
						isFocused
						? <button className="btn-text-underline" type="submit">Save</button>
						: <span className="btn-text-underline" onClick={() => showSectionHandler(SettingsSectionEnum.Name)}>Edit</span>
					}
				</div>
			</div>
		</form>
	);
}