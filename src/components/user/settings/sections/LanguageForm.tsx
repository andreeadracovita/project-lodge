import { useEffect, useState } from "react";

import { SettingsSectionEnum } from "../SettingsSectionEnum";
import { formClassNames } from "../FormClassNames";
import { updateUser } from "api/BackendApiService";
import FormError from "components/common/FormError";
import { useAuth } from "components/security/AuthContext";
import { availableLanguages } from "utils/constants";

type LanguageFormProps = {
	value?: string,
	isFocused: boolean,
	showSectionHandler: any,
	clearSectionHandler: any
};

export default function LanguageForm({ value, isFocused, showSectionHandler, clearSectionHandler }: LanguageFormProps) {
	const authContext: any = useAuth();
	const [language, setLanguage] = useState<string | undefined>(authContext.language);
	const [errors, setErrors] = useState<string[]>([]);

	useEffect(() => {
		if (value !== null && value !== "") {
			setLanguage(value);
		}
	}, [value]);

	useEffect(() => {
		if (!isFocused) {
			// Reset state
			if (value !== null && value !== "") {
				setLanguage(value);
			} else {
				setLanguage(authContext.language);
			}
		}
	}, [isFocused]);
	
	function handleChange(event: any): void {
		setLanguage(event.target.value);
	}

	function handleSubmit(event: any): void {
		event.preventDefault();
		updateUser({ language })
			.then(() => {
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
									availableLanguages.map((l: any, i: number) => 
										<option key={i} value={l.value}>{l.label}</option>
									)
								}
							</select>
							<FormError errors={errors} />
						</>
						: <span>
							{
								value 
								? availableLanguages.find((l: any) => l.value === value)?.label
								: availableLanguages.find((l: any) => l.value === authContext.language)?.label
							}
						</span>
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