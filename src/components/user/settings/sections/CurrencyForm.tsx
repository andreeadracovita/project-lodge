import { useEffect, useState } from "react";

import { SettingsSectionEnum } from "../SettingsSectionEnum";
import { formClassNames } from "../FormClassNames";
import { updateUser } from "api/BackendApiService";
import FormError from "components/common/FormError";
import { useAuth } from "components/security/AuthContext";
import { availableCurrencies } from "utils/constants";

type CurrencyFormProps = {
	value: string | undefined,
	isFocused: boolean,
	showSectionHandler: any,
	clearSectionHandler: any,
	refreshUserData: any
};

export default function CurrencyForm({ value, isFocused, showSectionHandler, clearSectionHandler, refreshUserData }: CurrencyFormProps) {
	const authContext: any = useAuth();
	const [currency, setCurrency] = useState(authContext.currency);
	const [errors, setErrors] = useState<string[]>([]);

	useEffect(() => {
		if (value !== null && value !== "") {
			setCurrency(value);
		}
	}, [value]);

	useEffect(() => {
		if (!isFocused) {
			// Reset state
			if (value !== null && value !== "") {
				setCurrency(value);
			} else {
				setCurrency(authContext.currency);
			}
		}
	}, [isFocused]);
	
	function handleChange(event: any): void {
		setCurrency(event.target.value);
	}

	function handleSubmit(event: any): void {
		event.preventDefault();
		updateUser({ currency: currency })
			.then(response => {
				const errors = response.data.errors;
				if (errors) {
					setErrors(errors);
					return;
				}
				clearSectionHandler();
				setErrors([]);
				authContext.setUserConfig();
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
					<label htmlFor="currency">Currency</label>
				</div>
				<div className="col-8">
					{
						isFocused
						? <>
							<select
								id="currencyCode"
								className={formClassNames}
								name="currency"
								value={currency}
								onChange={handleChange}
							>
								{
									availableCurrencies.map((currency: string, i: number) => 
										<option key={i} value={currency}>{currency}</option>
									)
								}
							</select>
							<FormError errors={errors} />
						</>
						: <span>{value ?? authContext.currency}</span>
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