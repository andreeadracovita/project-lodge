import { useEffect, useState } from "react";
import classNames from "classnames";
import * as Icon from "react-bootstrap-icons";

import "./FormPartDescription.css";
import { getAllFeatures, getAllExperiences } from "/src/api/LodgeDbApiService";
import { capitalizeFirstLetter } from "/src/utils/StringUtils";
import { experienceIconMap } from "/src/utils/mappings";
import { updatePropertyDetails } from "/src/api/LodgeDbApiService";
import localisedString from "/src/localisation/en-GB";

export default function FormPartDescription({
	isEditable,
	showButton,
	input,
	propertyId,
	handleChange,
	handleChangeFeatureMultiselect,
	handleChangeExperienceMultiselect,
	advanceState
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
		return input.featuresIds.includes(featureId);
	}

	function isExperienceIdSelected(experienceId) {
		return input.experiencesIds.includes(experienceId);
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

	function onDescriptionSubmit(event) {
		event.preventDefault();
		
		updatePropertyDetails(propertyId, {
			description: input.description,
			guests: input.guests,
			beds: input.beds,
			bedrooms: input.bedrooms,
			bathrooms: input.bathrooms,
			features_ids: input.featuresIds,
			experiences_ids: input.experiencesIds
		})
			.then(() => {
				advanceState();
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<form onSubmit={onDescriptionSubmit}>
			<label htmlFor="description">{ localisedString["hosting:description-detail"] }</label>
			<textarea
				id="description"
				className={stylingFormTextArea}
				name="description"
				value={input.description}
				readOnly={!isEditable}
				onChange={isEditable ? handleChange : undefined}
				rows="3"
			>
				{ localisedString["hosting:description-placeholder"] }
			</textarea>

			<p className="mt-3 mb-1">{ localisedString["hosting:capacity-detail"] }</p>
			<div className="row">
				<div className="col-2">
					<label htmlFor="guests">{ localisedString["hosting:guests"] }</label>
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
					<label htmlFor="beds">{ localisedString["hosting:beds"] }</label>
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
					<label htmlFor="bedrooms">{ localisedString["hosting:bedrooms"] }</label>
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
					<label htmlFor="bathrooms">{ localisedString["hosting:bathrooms"] }</label>
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
				<h2 className="mt-3">{ localisedString["hosting:features"] }</h2>
				<div id="selected-features" className="d-flex flex-wrap">
					{
						input.featuresIds.map((id) => {
							const foundFeature = features.find(feature => feature.id == id);
							if (foundFeature) {
								return <span
									key={foundFeature.id}
									id={foundFeature.id}
									className={classNames(
										"features-list-item",
										{
											"selectable-item": isEditable,
											"selected-feature": isEditable && isFeatureIdSelected(foundFeature.id)
										}
									)}
									onClick={isEditable ? handleChangeFeatureMultiselect : undefined}
								>
									{ capitalizeFirstLetter(foundFeature.name) }
								</span>
							}
						})	
					}
				</div>
				{
					isEditable &&
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
									{ capitalizeFirstLetter(feature.name) }
								</span>
							)	
						}
					</div>
				}
			</div>

			<div id="experiences">
				<label htmlFor="experiences" className="mt-3">{ localisedString["hosting:experiences-detail"] }</label>
				<div id="selected-features" className="d-flex flex-wrap">
					{
						input.experiencesIds.map((id) => {
							const foundExp = experiences.find(exp => exp.id == id);
							if (foundExp) {
								return <span
									key={foundExp.id}
									id={foundExp.id}
									className={classNames(
										"features-list-item",
										{
											"selectable-item": isEditable,
											"selected-feature": isEditable && isExperienceIdSelected(foundExp.id)
										}
									)}
									onClick={isEditable ? handleChangeExperienceMultiselect : undefined}
								>
									{ experienceIconMap.get(foundExp.name) } { capitalizeFirstLetter(foundExp.name) }
								</span>
							}
						})	
					}
				</div>
				{
					isEditable &&
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
					type="submit"
					className="btn btn-light rounded-pill brand-color-background my-5 d-flex align-items-center"
				>
					{ localisedString["hosting:add-photos-next"] } <Icon.ChevronRight />
				</button>
			}
		</form>
	);
}
