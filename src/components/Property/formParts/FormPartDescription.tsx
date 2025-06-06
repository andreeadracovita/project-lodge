import { useEffect, useState } from "react";
import classNames from "classnames";
import * as Icon from "react-bootstrap-icons";

import "./FormPartDescription.css";
import { getAllFeatures, getAllExperiences } from "/src/api/LodgeDbApiService";
import { capitalizeFirstLetter } from "/src/utils/StringUtils";
import { experienceIconMap } from "/src/utils/mappings";

export default function FormPartDescription({
	isEditable,
	showButton,
	showUnselectedFeatures,
	input,
	handleChange,
	onButtonClicked,
	handleChangeFeatureMultiselect,
	handleChangeExperienceMultiselect
}) {
	const [features, setFeatures] = useState([]);
	const [experiences, setExperiences] = useState([]);

	useEffect(() => {
		getAllFeatures()
			.then(response => {
				if (response.data.length > 0) {
					setFeatures(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			});

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

	function isFeatureIdSelected(featureId) {
		return input.features_ids.includes(featureId);
	}

	function isExperienceIdSelected(experienceId) {
		return input.experiences_ids.includes(experienceId);
	}

	const stylingFormTextArea = classNames(
		"form-control",
		{
			"text-muted": !isEditable
		}
	);

	const stylingFormControl = classNames(
		"form-control",
		"rounded-pill",
		"w-100",
		{
			"text-muted": !isEditable
		}
	);

	return (
		<form>
			<label htmlFor="description">Let guests know about your property</label>
			<textarea
				id="description"
				className={stylingFormTextArea}
				name="description"
				value={input.description}
				readOnly={!isEditable}
				onChange={isEditable ? handleChange : undefined}
				rows="3"
			>
				Describe your property here
			</textarea>

			<p className="mt-3 mb-1">How many people can stay?</p>
			<div className="row">
				<div className="col-2">
					<label htmlFor="guests">Guests</label>
				</div>
				<div className="col-4">
					<input
						id="guests"
						type="number"
						className={stylingFormControl}
						name="guests"
						value={input.guests}
						readOnly={!isEditable}
						onChange={isEditable ? handleChange : undefined}
					/>
				</div>
			</div>

			<div className="row mt-2">
				<div className="col-2">
					<label htmlFor="beds">Beds</label>
				</div>
				<div className="col-4">
					<input
						id="beds"
						type="number"
						className={stylingFormControl}
						name="beds"
						value={input.beds}
						readOnly={!isEditable}
						onChange={isEditable ? handleChange : undefined}
					/>
				</div>
			</div>

			<div className="row mt-2">
				<div className="col-2">
					<label htmlFor="bedrooms">Bedrooms</label>
				</div>
				<div className="col-4">
					<input
						id="bedrooms"
						type="number"
						className={stylingFormControl}
						name="bedrooms"
						value={input.bedrooms}
						readOnly={!isEditable}
						onChange={isEditable ? handleChange : undefined}
					/>
				</div>
			</div>

			<div className="row mt-2">
				<div className="col-2">
					<label htmlFor="bathrooms">Bathrooms</label>
				</div>
				<div className="col-4">
					<input
						id="guests"
						type="number"
						className={stylingFormControl}
						name="bathrooms"
						value={input.bathrooms}
						readOnly={!isEditable}
						onChange={isEditable ? handleChange : undefined}
					/>
				</div>
			</div>

			<div id="features">
				<h2 className="mt-3">Features</h2>
				<div id="selected-features" className="d-flex flex-wrap">
					{
						input.features_ids.map((id) => {
							const foundFeature = features.find(feature => feature.id == id);
							if (foundFeature) {
								return <span
									key={foundFeature.id}
									id={foundFeature.id}
									className={classNames(
										"features-list-item",
										"selectable-item",
										{
											"selected-feature": isFeatureIdSelected(foundFeature.id)
										}
									)}
									onClick={isEditable ? handleChangeFeatureMultiselect : undefined}
								>
									{foundFeature.name}
								</span>
							}
						})	
					}
				</div>
				{
					showUnselectedFeatures &&
					<div id="unselected-features" className="d-flex flex-wrap">
						{
							features.map(feature => 
								<span
									key={feature.id}
									id={feature.id}
									className={classNames(
										"features-list-item",
										"selectable-item",
										{
											"d-none": isFeatureIdSelected(feature.id)
										}
									)}
									onClick={handleChangeFeatureMultiselect}
								>
									{feature.name}
								</span>
							)	
						}
					</div>
				}
			</div>

			<div id="experiences">
				<label htmlFor="experiences" className="mt-3">What experiences can guests have in the area?</label>
				<div id="selected-features" className="d-flex flex-wrap">
					{
						input.experiences_ids.map((id) => {
							const foundExp = experiences.find(exp => exp.id == id);
							if (foundExp) {
								return <span
									key={foundExp.id}
									id={foundExp.id}
									className={classNames(
										"features-list-item",
										"selectable-item",
										{
											"selected-feature": isExperienceIdSelected(foundExp.id)
										}
									)}
									onClick={isEditable ? handleChangeExperienceMultiselect : undefined}
								>
									{foundExp.name}
								</span>
							}
						})	
					}
				</div>
				{
					showUnselectedFeatures &&
					<div id="unselected-experiences" className="d-flex flex-wrap">
						{
							experiences.map(exp => 
								<span
									key={exp.id}
									id={exp.id}
									className={classNames(
										"features-list-item",
										"selectable-item",
										{
											"d-none": isExperienceIdSelected(exp.id)
										}
									)}
									onClick={handleChangeExperienceMultiselect}
								>
									{ experienceIconMap.get(exp.name) } { capitalizeFirstLetter(exp.name) }
								</span>
							)	
						}
					</div>
				}
			</div>

			{
				showButton &&
				<button
					id="go-to-add-photos-button"
					type="button"
					className="btn btn-light rounded-pill brand-color-background my-5 d-flex align-items-center"
					onClick={onButtonClicked}
				>
					Add photos next <Icon.ChevronRight />
				</button>
			}
		</form>
	);
}
