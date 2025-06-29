import * as Icon from "react-bootstrap-icons";
import classNames from "classnames";

import { updatePropertyDetails } from "/src/api/BackendApiService";
import { useAuth } from "/src/components/security/AuthContext";
import localisedString from "/src/localisation/en-GB";

export default function FormPartPricing({ isEditable, showButton, input, propertyId, handleChange, advanceState }) {
	const authContext = useAuth();
	const currency = authContext.currency;

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
			price: input.priceNight,
			currency: authContext.currency
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
					name="priceNight"
					value={input.priceNight}
					readOnly={!isEditable}
					onChange={isEditable ? handleChange : undefined}
				/>
				<div className="ms-3 lato-bold">{input.localCurrency} per night</div>
			</div>
			<div className="mt-6 text-muted">{ localisedString["hosting:pricing-currency-info"] }</div>
			<div className="mt-6 text-muted">{ localisedString["hosting:pricing-property-management-info"] }</div>

			{
				showButton &&
				<button
					id="go-to-pricing-button"
					type="submit"
					className="btn-pill my-5 d-flex align-items-center"
				>
					{ localisedString["hosting:review-property"] } <Icon.ChevronRight />
				</button>
			}
		</form>
	);
}
