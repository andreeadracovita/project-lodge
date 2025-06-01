import * as Icon from "react-bootstrap-icons";
import classNames from "classnames";

export default function FormPartPricing({isEditable, showButton, input, handleChange, onButtonClicked}) {
	const currency = "CHF";

	const stylingFormControl = classNames(
		"form-control",
		"rounded-pill",
		"w-25",
		{
			"text-muted": !isEditable
		}
	);

	return (
		<div>
			<label htmlFor="price">How much will guests pay for a night at your property?</label>
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
			<p className="mt-3">Price can be adjusted from the <a href="/hosting/properties" className="lato-bold">Property Management</a> page.</p>

			{
				showButton &&
				<button
					id="go-to-pricing-button"
					type="button"
					className="btn btn-light rounded-pill brand-color-background my-5 d-flex align-items-center"
					onClick={onButtonClicked}
				>
					Review property <Icon.ChevronRight />
				</button>
			}
		</div>
	);
}
