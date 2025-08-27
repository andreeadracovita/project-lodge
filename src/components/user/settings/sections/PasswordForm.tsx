import { useState } from "react";

import { SettingsSectionEnum } from "../SettingsSectionEnum";
import { updateUserPassword } from "api/BackendApiService";
import FormError from "components/common/FormError";
import PasswordInput from "components/common/PasswordInput";

type PasswordFormProps = {
	isFocused: boolean,
	showSectionHandler: any,
	clearSectionHandler: any
};

export default function PasswordForm({ isFocused, showSectionHandler, clearSectionHandler }: PasswordFormProps) {
	const [input, setInput] = useState({
		oldPassword: "",
		newPassword: ""
	});
	const [errors, setErrors] = useState<string[]>([]);

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
		updateUserPassword({ old_password: input.oldPassword, new_password: input.newPassword })
			.then(response => {
				const errors = response.data.errors;
				if (errors) {
					setErrors(errors);
					return;
				}
				clearSectionHandler();
				setErrors([]);
				setInput({ oldPassword: "", newPassword: "" });
			})
			.catch((error) => {
				console.error(error);
			});
	}
	
	return (
		<form onSubmit={handleSubmit}>
			<div className="row px-3">
				<div className="col-2">
					<label htmlFor="currency">Password</label>
				</div>
				<div className="col-8">
					{
						isFocused
						? <>
							<label htmlFor="old-password">Old password</label>
							<PasswordInput
								id="old-password"
								name="oldPassword"
								value={input.oldPassword}
								handleChange={handleChange}
							/>
	
							<label htmlFor="new-password">New password</label>
							<PasswordInput
								id="new-password"
								name="newPassword"
								value={input.newPassword}
								handleChange={handleChange}
							/>

							<FormError errors={errors} />
						</>
						: <span>*****</span>
					}
				</div>
				<div className="col-2 d-flex justify-content-end align-items-start">
					{
						isFocused
						? <button className="btn-text-underline" type="submit">Save</button>
						: <span className="btn-text-underline" onClick={() => showSectionHandler(SettingsSectionEnum.Password)}>Edit</span>
					}
				</div>
			</div>
		</form>
	);
}