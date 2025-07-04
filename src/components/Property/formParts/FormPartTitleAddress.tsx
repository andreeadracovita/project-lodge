import axios from "axios";
import classNames from "classnames";
import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import countries from "react-select-country-list";

import { capitalizeFirstLetter } from "/src/utils/StringUtils";
import {
	createNewProperty,
	createNewPropertyDetailBase,
	updateProperty,
	updatePropertyDetails,
	getAllBuildingTypes,
	getAllRentalTypes
} from "/src/api/BackendApiService";
import CountrySelect from "/src/components/common/CountrySelect";

export default function FormPartTitleAddress({ isEditable, showButton, input, propertyId, setPropertyId, handleChange, handleChangeCountry, advanceState }) {
	const [showError, setShowError] = useState(false);
	const [buildingTypes, setBuildingTypes] = useState([]);
	const [rentalTypes, setRentalTypes] = useState([]);

	useEffect(() => {
		getAllBuildingTypes()
			.then(response => {
				if (response.data.length > 0) {
					setBuildingTypes(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			});

		getAllRentalTypes()
			.then(response => {
				if (response.data.length > 0) {
					setRentalTypes(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	const stylingFormControl100 = classNames(
		"form-control",
		"rounded-pill",
		"w-100",
		{
			"text-muted": !isEditable
		}
	);


	async function addPropertyDetail(propertyId: int) {
		// Create details
		// Parse select values as int
		const payloadPropDetail = {
			property_id: propertyId,
			street: input.street,
			street_no: input.streetNo,
			building_type_id: parseInt(input.buildingType),
			rental_type_id: parseInt(input.rentalType),
			local_currency: input.localCurrency
		}
		createNewPropertyDetailBase(payloadPropDetail)
			.then(responsePropDetail => {
				advanceState();
			})
			.catch(error => {
				console.error(error);
			})
	}

	async function addProperty(geo) {
		const payloadProp = {
			title: input.title,
			geo,
			city: input.city,
			country: input.country,
			is_listed: false
		};
		// Create a new entry
		createNewProperty(payloadProp)
			.then(responseProp => {
				const propertyId = responseProp.data.id;
				setPropertyId(propertyId);
				addPropertyDetail(propertyId);
			})
			.catch(error => {
				console.error(error);
			});
	}

	/**
	 * 1. Create property entry & property_details entry with partial details. (is_listed is false by default)
	 * 2. If back and edit, patch entry with new details.
	 */
	async function onSubmit() {
		event.preventDefault();

		if (input.title === "" || input.city === "" || input.country === "" || input.street === "" || input.streetNo === "") {
			setShowError(true);
			return;
		}

		const countryLabel = countries().getLabel(input.country);
		const address = input.city + "+" + input.street + "+" + input.streetNo + "+" + countryLabel;
		const apiKey = import.meta.env.VITE_GEOCODE_API_KEY;
		axios.get(`https://geocode.maps.co/search?q=${address}&api_key=${apiKey}`)
			.then(response => {
				if (response.data.length > 0) {
					const data = response.data[0];
					const geo = { x: data.lat, y: data.lon };
					if (!propertyId) {
						addProperty(geo);
					} else {
						let check = 0;
						// Update property
						updateProperty(propertyId, {
							title: input.title,
							city: input.city,
							country: input.country
						})
							.then(() => {
								check++;
								if (check === 2) {
									advanceState();
								}
							})
							.catch((error) => {
								console.error(error);
							});

						// Parse select values as int
						updatePropertyDetails(propertyId, {
							building_type_id: parseInt(input.buildingType),
							rental_type_id: parseInt(input.rentalType),
							street: input.street,
							street_no: input.streetNo,
							local_currency: input.localCurrency
						})
							.then(() => {
								check++;
								if (check === 2) {
									advanceState();
								}
							})
							.catch((error) => {
								console.error(error);
							});
					}
				} else {
					setShowError(true);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}
	
	return (
		<form onSubmit={onSubmit}>
			{ showError && <span className="text-red d-block">Errors present!</span> }
			<label htmlFor="title">Title <span className="text-red">*</span></label>
			<input
				id="title"
				type="text"
				className={stylingFormControl100}
				name="title"
				value={input.title}
				readOnly={!isEditable}
				onChange={handleChange}
				required
			/>

			<label htmlFor="buildingType" className="mt-2">Type of building <span className="text-red">*</span></label>
			<select
				id="buildingType"
				className={stylingFormControl100}
				name="buildingType"
				value={input.buildingType ?? 1}
				readOnly={!isEditable}
				onChange={handleChange}
				required
			>
				{
					buildingTypes.map(type => 
						<option key={type.id} value={type.id}>{capitalizeFirstLetter(type.name)}</option>
					)
				}
				
			</select>

			<label htmlFor="rentalType" className="mt-2">Type of rental <span className="text-red">*</span></label>
			<select
				id="rentalType"
				className={stylingFormControl100}
				name="rentalType"
				value={input.rentalType ?? 1}
				readOnly={!isEditable}
				onChange={handleChange}
				required
			>
				{
					rentalTypes.map(type => 
						<option key={type.id} value={type.id}>{capitalizeFirstLetter(type.name)}</option>
					)
				}
			</select>

			<div id="address">
				<h2 className="section-heading">Address</h2>
				<label htmlFor="street" className="mt-2">Street <span className="text-red">*</span></label>
				<input
					id="street"
					type="text"
					className={stylingFormControl100}
					name="street"
					value={input.street}
					readOnly={!isEditable}
					onChange={handleChange}
					required
				/>
				<label htmlFor="streetNo" className="mt-2">Street number <span className="text-red">*</span></label>
				<input
					id="streetNo"
					type="text"
					className={stylingFormControl100}
					name="streetNo"
					value={input.streetNo}
					readOnly={!isEditable}
					onChange={handleChange}
					required
				/>
				<label htmlFor="city" className="mt-2">City <span className="text-red">*</span></label>
				<input
					id="city"
					type="text"
					className={stylingFormControl100}
					name="city"
					value={input.city}
					readOnly={!isEditable}
					onChange={handleChange}
					required
				/>
				<label htmlFor="country" className="mt-2">Country <span className="text-red">*</span></label>
				{
					isEditable
					? <CountrySelect id="country" initialValue={input.country} handleFormChange={handleChangeCountry} />
					: <div className={stylingFormControl100}>{countries().getLabel(input.country)}</div>
				}
			</div>

			{
				showButton &&
				<button
					id="go-to-describe-place-button"
					type="submit"
					className="btn-pill my-5 d-flex align-items-center"
				>
					Describe place next <Icon.ChevronRight />
				</button>
			}
		</form>
	);
}
