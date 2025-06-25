import { useEffect, useState } from "react";
import countries from "react-select-country-list";

import { SettingsSectionEnum } from "../SettingsSectionEnum";
import NationalitySelect from "./NationalitySelect";
import { updateUser } from "/src/api/BackendApiService";

export default function NationalityForm({ value, isFocused, showSectionHandler, clearSectionHandler }) {
	const [countryCode, setCountryCode] = useState(value);

	useEffect(() => {
		setCountryCode(value);
	}, [value]);

	function handleChange(value): void {
		setCountryCode(value);
	}

	function handleSubmit(event: Event): void {
		event.preventDefault();
		updateUser({ country_code: countryCode })
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
					<label htmlFor="nationality">Nationality</label>
				</div>
				<div className="col-8">
					{
						isFocused
						? <NationalitySelect initialValue={countryCode} handleFormChange={handleChange} />
						: <span>{countryCode ? countries().getLabel(countryCode) : ""}</span>
					}
					
				</div>
				<div className="col-2 d-flex justify-content-end align-items-start">
					{
						isFocused
						? <button className="btn-text-underline" type="submit">Save</button>
						: <span className="btn-text-underline" onClick={() => showSectionHandler(SettingsSectionEnum.Nationality)}>Edit</span>
					}
				</div>
			</div>
		</form>
	);
}