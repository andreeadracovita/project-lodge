import classNames from "classnames";
import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

import { updateProperty } from "/src/api/BackendApiService";
import { useAuth } from "/src/components/security/AuthContext";

export default function FormPartPricing({ isEditable, showButton, input, propertyId, handleChange, advanceState }) {
	const authContext = useAuth();
	const currency = authContext.currency;
	const [errors, setErrors] = useState([]);

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

		updateProperty(propertyId, {
			price: input.priceNight
		})
			.then(response => {
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
		<form onSubmit={onSubmit}>
			<label htmlFor="price">How much will guests pay for a night at your property? <span className="text-red">*</span></label>
			<div className="d-flex align-items-center">
				<input
					id="price"
					type="text"
					className={stylingFormControl}
					name="priceNight"
					value={input.priceNight}
					readOnly={!isEditable}
					onChange={isEditable ? handleChange : undefined}
					required
				/>
				<div className="ms-3 lato-bold">{input.localCurrency} per night</div>
			</div>
			<div className="mt-6 text-muted">Prices are set in the local currency of the property.</div>
			<div className="mt-6 text-muted">Price can be adjusted from the Property Management page.</div>
			<FormError errors={errors} />

			{
				showButton &&
				<button
					id="go-to-pricing-button"
					type="submit"
					className="btn-pill my-5 d-flex align-items-center"
				>
					Review your property <Icon.ChevronRight />
				</button>
			}
		</form>
	);
}
