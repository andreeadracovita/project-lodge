import { useEffect, useState } from "react";

import { SettingsSectionEnum } from "../SettingsSectionEnum";
import { formClassNames } from "../formClassNames";
import { updateUser } from "/src/api/BackendApiService";
import FormError from "/src/components/common/FormError";
import { useAuth } from "/src/components/security/AuthContext";
import { availableLanguages } from "/src/utils/constants";

export default function LanguageForm({ value, isFocused, showSectionHandler, clearSectionHandler }) {
	const authContext = useAuth();
	const [language, setLanguage] = useState(authContext.language);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		if (value !== null && value !== "") {
			setLanguage(value);
		}
	}, [value]);
	
	function handleChange(event: Event): void {
		setLanguage(event.target.value);
	}

	function handleSubmit(event: Event): void {
		event.preventDefault();
		updateUser({ language: language })
			.then(response => {
				if (errors) {
					setErrors(errors);
					setLanguage(value);
					return;
				}
				clearSectionHandler();
				setErrors([]);
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
					<label htmlFor="currency">Language</label>
				</div>
				<div className="col-8">
					{
						isFocused
						? <>
							<select
								id="language"
								className={formClassNames}
								name="language"
								value={language}
								onChange={handleChange}
							>
								{
									availableLanguages.map((l, i) => 
										<option key={i} value={l.value}>{l.label}</option>
									)
								}
							</select>
							<FormError errors={errors} />
						</>
						: <span>{
							value 
							? availableLanguages.find(l => l.value === value).label
							: availableLanguages.find(l => l.value === authContext.language).label
						}</span>
					}
				</div>
				<div className="col-2 d-flex justify-content-end align-items-start">
					{
						isFocused
						? <button className="btn-text-underline" type="submit">Save</button>
						: <span className="btn-text-underline" onClick={() => showSectionHandler(SettingsSectionEnum.Language)}>Edit</span>
					}
				</div>
			</div>
		</form>
	);
}