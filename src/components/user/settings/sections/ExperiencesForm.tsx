import { useEffect, useState } from "react";

import { SettingsSectionEnum } from "../SettingsSectionEnum";
import { getAllExperiences, updateUser } from "api/BackendApiService";
import Multiselect from "components/common/Multiselect";

type ExperiencesFormProps = {
	value: number[],
	isFocused: boolean,
	showSectionHandler: any,
	clearSectionHandler: any,
	refreshUserData: any
};

export default function ExperiencesForm({ value, isFocused, showSectionHandler, clearSectionHandler, refreshUserData }: ExperiencesFormProps) {
	const [experiencesIds, setExperiencesIds] = useState<number[]>([]);
	const [experiences, setExperiences] = useState<string[]>();

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

	useEffect(() => {
		if (!isFocused) {
			// Reset state
			if (value !== null) {
				setExperiencesIds(value);
			} else {
				setExperiencesIds([]);
			}
		}
	}, [isFocused]);

	function handleChange(event: any) {
		const item = parseInt(event.target.id);

		let newValues = Array.from(experiencesIds);
		if (newValues.includes(item)) {
			newValues = newValues.filter(val => val !== item);
		} else {
			newValues.push(item);
		}
		setExperiencesIds(newValues);
	}

	function handleSubmit(event: any): void {
		event.preventDefault();
		updateUser({ experiences_ids: experiencesIds })
			.then(() => {
				clearSectionHandler();
				refreshUserData();
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
					{
						experiences &&
						<Multiselect
							options={experiences}
							selectedIds={experiencesIds}
							handleChange={handleChange}
							isEditable={isFocused}
							iconMap={undefined}
						/>
					}
				</div>
				<div className="col-2 d-flex justify-content-end align-items-start">
					{
						isFocused
						? <button className="btn-text-underline" type="submit">Save</button>
						: <span className="btn-text-underline" onClick={() => showSectionHandler(SettingsSectionEnum.Experiences)}>Edit</span>
					}
				</div>
			</div>
		</form>
	);
}