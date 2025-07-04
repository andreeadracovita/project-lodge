import classNames from "classnames";
import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

import "./FormPartDescription.css";
import { getAllFeatures, getAllExperiences, updateProperty } from "/src/api/BackendApiService";
import FormError from "/src/components/common/FormError";
import Multiselect from "/src/components/common/Multiselect";
import { experienceIconMap, featuresIconMap } from "/src/utils/mappings";

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
	const [errors, setErrors] = useState([]);

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
		
		updateProperty(propertyId, {
			description: input.description,
			guests: input.guests,
			beds: input.beds,
			bedrooms: input.bedrooms,
			bathrooms: input.bathrooms,
			features_ids: input.featuresIds,
			experiences_ids: input.experiencesIds
		})
			.then(reponse => {
				const errors = response.data.errors;
				if (errors) {
					setErrors(errors);
					return;
				}
				advanceState();
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<form onSubmit={onDescriptionSubmit}>
			<label htmlFor="description">Let guests know about your property <span className="text-red">*</span></label>
			<textarea
				id="description"
				className={stylingFormTextArea}
				name="description"
				value={input.description}
				readOnly={!isEditable}
				onChange={isEditable ? handleChange : undefined}
				rows="3"
				required
			>
				Describe your property here
			</textarea>

			<p className="mt-3 mb-1">How many people can stay?</p>
			<div className="row">
				<div className="col-2">
					<label htmlFor="guests">Guests <span className="text-red">*</span></label>
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
						required
					/>
				</div>
			</div>

			<div className="row mt-2">
				<div className="col-2">
					<label htmlFor="beds">Beds <span className="text-red">*</span></label>
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
						required
					/>
				</div>
			</div>

			<div className="row mt-2">
				<div className="col-2">
					<label htmlFor="bedrooms">Bedrooms <span className="text-red">*</span></label>
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
						required
					/>
				</div>
			</div>

			<div className="row mt-2">
				<div className="col-2">
					<label htmlFor="bathrooms">Bathrooms <span className="text-red">*</span></label>
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
						required
					/>
				</div>
			</div>

			<div id="features">
				<h2 className="section-heading">Features</h2>
				<Multiselect
					options={features}
					selectedIds={input.featuresIds}
					handleChange={handleChangeFeatureMultiselect}
					isEditable={isEditable}
					iconMap={featuresIconMap}
				/>
			</div>

			<div id="experiences">
				<label htmlFor="experiences" className="mt-3">What experiences can guests have in the area?</label>
				<Multiselect
					options={experiences}
					selectedIds={input.experiencesIds}
					handleChange={handleChangeExperienceMultiselect}
					isEditable={isEditable}
					// iconMap={experienceIconMap}
				/>
			</div>
			<FormError errors={errors} />

			{
				showButton &&
				<button
					id="go-to-add-photos-button"
					type="submit"
					className="btn-pill my-5 d-flex align-items-center"
				>
					Add photos next <Icon.ChevronRight />
				</button>
			}
		</form>
	);
}
