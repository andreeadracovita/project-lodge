import * as Icon from "react-bootstrap-icons";
import classNames from "classnames";

import "./FormPartDescription.css";

function FormPartDescription({isEditable, showButton, showUnselectedFeatures, input, handleChange, onButtonClicked, handleChangeMultiselect}) {
	const features = ["Free WiFi", "Free parking", "Kitchen", "Lake view", "Sea view", "Mountain view", "BBQ grill", "Gym equipment", "TV"];

	function isFeatureSelected(feature) {
		return input.features.includes(feature);
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
		<div>
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
						input.features.map((feature, i) => 
							<span
								key={i}
								id={feature}
								className={classNames(
									"features-list-item",
									"selectable-item",
									{
										"selected-feature": isFeatureSelected(feature)
									}
								)}
								onClick={isEditable ? handleChangeMultiselect : undefined}
							>
								{feature}
							</span>
						)	
					}
				</div>
				{
					showUnselectedFeatures &&
					<div id="unselected-features" className="d-flex flex-wrap">
						{
							features.map((feature, i) => 
								<span
									key={i}
									id={feature}
									className={classNames(
										"features-list-item",
										"selectable-item",
										{
											"d-none": isFeatureSelected(feature)
										}
									)}
									onClick={handleChangeMultiselect}
								>
									{feature}
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
		</div>
	);
}

export default FormPartDescription;