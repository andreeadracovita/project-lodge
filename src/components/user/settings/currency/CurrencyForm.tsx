import { useEffect, useState } from "react";

import { SettingsSectionEnum } from "../SettingsSectionEnum";
import { formClassNames } from "../formClassNames";
import { updateUser } from "/src/api/BackendApiService";
import { useAuth } from "/src/components/security/AuthContext";
import { availableCurrencies } from "/src/utils/constants";

export default function CurrencyForm({ value, isFocused, showSectionHandler, clearSectionHandler }) {
	const authContext = useAuth();
	const [currency, setCurrency] = useState(authContext.currency);

	useEffect(() => {
		if (value !== null && value !== "") {
			setCurrency(value);
		}
	}, [value]);
	
	function handleChange(event: Event): void {
		setCurrency(event.target.value);
	}

	function handleSubmit(event: Event): void {
		event.preventDefault();
		updateUser({ currency: currency })
			.then(() => {
				clearSectionHandler();
				authContext.setUserConfig();
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="row px-3">
				<div className="col-2">
					<label htmlFor="currency">Currency</label>
				</div>
				<div className="col-8">
					{
						isFocused
						? <select
							id="currencyCode"
							className={formClassNames}
							name="currency"
							value={currency}
							onChange={handleChange}
						>
							{
								availableCurrencies.map((currency, i) => 
									<option key={i} value={currency}>{currency}</option>
								)
							}
						</select>
						: <span>{currency}</span>
					}
				</div>
				<div className="col-2 d-flex justify-content-end align-items-start">
					{
						isFocused
						? <button className="btn-text-underline" type="submit">Save</button>
						: <span className="btn-text-underline" onClick={() => showSectionHandler(SettingsSectionEnum.Currency)}>Edit</span>
					}
				</div>
			</div>
		</form>
	);
}