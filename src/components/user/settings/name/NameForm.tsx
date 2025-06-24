import { useEffect, useState } from "react";

import { SettingsSectionEnum } from "../SettingsSectionEnum";
import { formClassNames } from "../formClassNames";
import { updateUser } from "/src/api/BackendApiService";

export default function NameForm({ firstNameValue, lastNameValue, isFocused, showSection, clearSection }) {
	const [input, setInput] = useState({
		firstName: firstNameValue,
		lastName: lastNameValue
	});

	useEffect(() => {
		setInput({
			firstName: firstNameValue,
			lastName: lastNameValue
		})
	}, [firstNameValue, lastNameValue]);

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
		updateUser({ first_name: input.firstName, last_name: input.lastName })
			.then(() => {
				clearSection();
				authContext.setUserConfig();
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
						</>
						: <>
							<span>{input.firstName} {input.lastName}</span>
						</>
					}
					
				</div>
				<div className="col-2 d-flex justify-content-end align-items-start">
					{
						isFocused
						? <button className="btn-text-underline" type="submit">Save</button>
						: <span className="btn-text-underline" onClick={() => showSection(SettingsSectionEnum.Name)}>Edit</span>
					}
				</div>
			</div>
		</form>
	);
}