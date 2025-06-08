import * as Icon from "react-bootstrap-icons";
import classNames from "classnames";

import { updatePropertyDetails } from "/src/api/BackendApiService";
import localisedString from "/src/localisation/en-GB";

export default function FormPartPricing({ isEditable, showButton, input, propertyId, handleChange, advanceState }) {
	const currency = "CHF";

	const stylingFormControl = classNames(
		"form-control",
		"rounded-pill",
		"w-25",
		{
			"text-muted": !isEditable
		}
	);

	function onSubmit(event) {
		event.preventDefault();

		updatePropertyDetails(propertyId, {
			price: input.pricePerNight
		})
			.then(() => {
				advanceState();
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<form onSubmit={onSubmit}>
			<label htmlFor="price">{ localisedString["hosting:pricing-description"] }</label>
			<div className="d-flex align-items-center">
				<input
					id="price"
					type="text"
					className={stylingFormControl}
					name="pricePerNight"
					value={input.pricePerNight}
					readOnly={!isEditable}
					onChange={isEditable ? handleChange : undefined}
				/>
				<span className="ms-3 lato-bold">{currency} per night</span>
			</div>
			<p className="mt-3">{ localisedString["hosting:pricing-property-management-info"] }</p>

			{
				showButton &&
				<button
					id="go-to-pricing-button"
					type="submit"
					className="btn btn-light rounded-pill brand-color-background my-5 d-flex align-items-center"
				>
					{ localisedString["hosting:review-property"] } <Icon.ChevronRight />
				</button>
			}
		</form>
	);
}
