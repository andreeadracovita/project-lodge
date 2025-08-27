import { useEffect, useState } from "react";

import { SettingsSectionEnum } from "../SettingsSectionEnum";
import { formClassNames } from "../FormClassNames";
import { updateUser } from "api/BackendApiService";
import FormError from "components/common/FormError";

type EmailFormProps = {
	value: string | undefined,
	isFocused: boolean,
	showSectionHandler: any,
	clearSectionHandler: any,
	refreshUserData: any
};

export default function EmailForm({ value, isFocused, showSectionHandler, clearSectionHandler, refreshUserData }: EmailFormProps) {
	const [email, setEmail] = useState(value);
	const [errors, setErrors] = useState<string[]>([]);

	useEffect(() => {
		setEmail(value);
	}, [value]);

	useEffect(() => {
		if (!isFocused) {
			// Reset state
			setEmail(value);
		}
	}, [isFocused]);
	
	function handleChange(event: any): void {
		setEmail(event.target.value);
	}

	function handleSubmit(event: any): void {
		event.preventDefault();
		updateUser({ email: email })
			.then(response => {
				const errors = response.data.errors;
				if (errors) {
					setErrors(errors);
					setEmail(value);
					return;
				}
				clearSectionHandler();
				setErrors([]);
				refreshUserData();
			})
			.catch(error => {
				console.error(error);
			});
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="row px-3">
				<div className="col-2">
					<label htmlFor="email">Email</label>
				</div>
				<div className="col-8">
					{
						isFocused
						? <>
							<input
								id="email"
								name="email"
								value={email}
								onChange={handleChange}
								className={formClassNames}
								maxLength={50}
								required
							/>
							<FormError errors={errors} />
						</>
						: <span>{value}</span>
					}
				</div>
				<div className="col-2 d-flex justify-content-end align-items-start">
					{
						isFocused
						? <button className="btn-text-underline" type="submit">Save</button>
						: <span className="btn-text-underline" onClick={() => showSectionHandler(SettingsSectionEnum.Email)}>Edit</span>
					}
				</div>
			</div>
		</form>
	);
}