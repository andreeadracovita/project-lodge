import { useState } from "react";

import { SettingsSectionEnum } from "../SettingsSectionEnum";
import { formClassNames } from "../formClassNames";
import { updateUserPassword } from "/src/api/BackendApiService";
import PasswordInput from "/src/components/common/PasswordInput";

export default function PasswordForm({ isFocused, showSectionHandler, clearSectionHandler }) {
	const [input, setInput] = useState({
		oldPassword: "",
		newPassword: ""
	});

	function handleChange(event): void {
		const { name, value } = event.target;
		setInput(prevVal => {
			return {
				...prevVal,
				[name]: value
			}
		});
	}

	function handleSubmit(event: Event): void {
		event.preventDefault();
		if (input.newPassword === "") {
			// TODO: error
			return;
		}
		updateUserPassword({ old_password: input.oldPassword, new_password: input.newPassword })
			.then(() => {
				clearSectionHandler();
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