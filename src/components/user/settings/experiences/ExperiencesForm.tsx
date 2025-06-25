import { useEffect, useState } from "react";

import { SettingsSectionEnum } from "../SettingsSectionEnum";
import { getAllExperiences, updateUser } from "/src/api/BackendApiService";
import Multiselect from "/src/components/common/Multiselect";

export default function ExperiencesForm({ value, isFocused, showSection, clearSection }) {
	const [experiencesIds, setExperiencesIds] = useState([]);
	const [experiences, setExperiences] = useState();

	useEffect(() => {
		getAllExperiences()
			.then(response => {
				if (response.data.length > 0) {
					setExperiences(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			})
	}, []);

	useEffect(() => {
		if (value !== null) {
			setExperiencesIds(value);
		}
	}, [value]);

	function handleChange(event) {
		const item = parseInt(event.target.id);

		let newValues = Array.from(experiencesIds);
		if (newValues.includes(item)) {
			newValues = newValues.filter(val => val !== item);
		} else {
			newValues.push(item);
		}
		setExperiencesIds(newValues);
	}

	function handleSubmit(event: Event): void {
		event.preventDefault();
		updateUser({ experiences_ids: experiencesIds })
			.then(() => {
				clearSection();
			})
			.catch((error) => {
				console.error(error);
			});
	}
	
	return (
		<form onSubmit={handleSubmit}>
			<div className="row px-3">
				<div className="col-2">
					<label htmlFor="currency">Experiences</label>
				</div>
				<div className="col-8">
					<Multiselect
						options={experiences}
						selectedIds={experiencesIds}
						handleChange={handleChange}
						isEditable={isFocused}
					/>
				</div>
				<div className="col-2 d-flex justify-content-end align-items-start">
					{
						isFocused
						? <button className="btn-text-underline" type="submit">Save</button>
						: <span className="btn-text-underline" onClick={() => showSection(SettingsSectionEnum.Experiences)}>Edit</span>
					}
				</div>
			</div>
		</form>
	);
}