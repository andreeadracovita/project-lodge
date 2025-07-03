import { useEffect, useState } from "react";

import { SettingsSectionEnum } from "../SettingsSectionEnum";
import { formClassNames } from "../formClassNames";
import { updateUser } from "/src/api/BackendApiService";
import FormError from "/src/components/common/FormError";

export default function EmailForm({ value, isFocused, showSectionHandler, clearSectionHandler }) {
	const [email, setEmail] = useState(value);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		setEmail(value);
	}, [value]);
	
	function handleChange(event): void {
		setEmail(event.target.value);
	}

	function handleSubmit(event: Event): void {
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
							<input id="email" name="email" value={email} onChange={handleChange} className={formClassNames} />
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