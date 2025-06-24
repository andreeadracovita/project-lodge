import { useEffect, useState } from "react";

import { SettingsSectionEnum } from "../SettingsSectionEnum";
import { formClassNames } from "../formClassNames";

export default function EmailForm({ value, isFocused, showSection, clearSection }) {
	const [email, setEmail] = useState(value);

	useEffect(() => {
		setEmail(value);
	}, [value]);
	
	function handleChange(event): void {
		setEmail(event.target.value);
	}

	function handleSubmit(event: Event): void {
		event.preventDefault();
		// updateUser({ email: input.email })
		// 	.then(() => {
		// 		clearSection();
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 	});
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
						? <input id="email" name="email" value={email} onChange={handleChange} className={formClassNames} />
						: <span>{email}</span>
					}
				</div>
				<div className="col-2 d-flex justify-content-end align-items-start">
					{
						isFocused
						? <button className="btn-text-underline" type="submit">Save</button>
						: <span className="btn-text-underline" onClick={() => showSection(SettingsSectionEnum.Email)}>Edit</span>
					}
				</div>
			</div>
		</form>
	);
}