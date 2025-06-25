import { useState } from "react";

import { SettingsSectionEnum } from "../SettingsSectionEnum";
import { formClassNames } from "../formClassNames";
import { updateUserPassword } from "/src/api/BackendApiService";

export default function PasswordForm({ isFocused, showSectionHandler, clearSectionHandler }) {
	const [input, setInput] = useState({
		oldPassword: "",
		newPassword: "",
		newPasswordConfirm: ""
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
		if (input.newPassword !== input.newPasswordConfirm) {
			console.log("Confirmation does not match");
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
							<label htmlFor="old-pass">Old password</label>
							<input
								type="password"
								id="old-pass"
								name="oldPassword"
								value={input.oldPassword}
								onChange={handleChange}
								className={formClassNames}
							/>
	
							<label htmlFor="new-pass">New password</label>
							<input
								type="password"
								id="new-pass"
								name="newPassword"
								value={input.newPassword}
								onChange={handleChange}
								className={formClassNames}
							/>

							<label htmlFor="new-pass">Confirm new password</label>
							<input
								type="password"
								id="confirm-new-pass"
								name="newPasswordConfirm"
								value={input.newPasswordConfirm}
								onChange={handleChange}
								className={formClassNames}
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