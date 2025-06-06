import axios from "axios";
import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import classNames from "classnames";

import { getAllBuildingTypes, getAllRentalTypes } from "/src/api/LodgeDbApiService";
import { capitalizeFirstLetter } from "/src/utils/StringUtils";
import {
	createNewProperty,
	createNewPropertyDetailBase,
	updateProperty,
	updatePropertyDetails
} from "/src/api/LodgeDbApiService";

export default function FormPartTitleAddress({ isEditable, showButton, input, propertyId, setPropertyId, handleChange, advanceState }) {
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
		const payloadPropDetail = {
			property_id: propertyId,
			street: input.street,
			street_no: input.streetNo
		}
		createNewPropertyDetailBase(payloadPropDetail)
			.then(responsePropDetail => {
				console.log(responsePropDetail);
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

		const address = input.city + "+" + input.street + "+" + input.streetNo + "+" + input.country;
		axios.get(`https://geocode.maps.co/search?q=${address}&api_key=6829981227127748709913iypd29e39`)
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
						updatePropertyDetails(propertyId, {
							building_type_id: parseInt(input.buildingType),
							rental_type_id: parseInt(input.rentalType),
							street: input.street,
							street_no: input.streetNo
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
			{ showError && <span className="error-text d-block">Errors present!</span> }
			<label htmlFor="title">Title</label>
			<input
				id="title"
				type="text"
				className={stylingFormControl100}
				name="title"
				value={input.title}
				readOnly={!isEditable}
				onChange={handleChange}
			/>

			<label htmlFor="buildingType" className="mt-2">Type of building</label>
			<select
				id="buildingType"
				className={stylingFormControl100}
				name="buildingType"
				value={input.buildingType}
				readOnly={!isEditable}
				onChange={isEditable ? handleChange : undefined}
			>
				{
					buildingTypes.map(type => 
						<option key={type.id} value={type.id}>{capitalizeFirstLetter(type.name)}</option>
					)
				}
				
			</select>

			<label htmlFor="rentalType" className="mt-2">Type of rental</label>
			<select
				id="rentalType"
				className={stylingFormControl100}
				name="rentalType"
				value={input.rentalType}
				readOnly={!isEditable}
				onChange={isEditable ? handleChange : undefined}
			>
				{
					rentalTypes.map(type => 
						<option key={type.id} value={type.id}>{capitalizeFirstLetter(type.name)}</option>
					)
				}
			</select>

			<div id="address">
				<h2 className="mt-3">Address</h2>
				<label htmlFor="street" className="mt-2">Street</label>
				<input
					id="street"
					type="text"
					className={stylingFormControl100}
					name="street"
					value={input.street}
					readOnly={!isEditable}
					onChange={isEditable ? handleChange : undefined}
				/>
				<label htmlFor="streetNo" className="mt-2">Street number</label>
				<input
					id="streetNo"
					type="text"
					className={stylingFormControl100}
					name="streetNo"
					value={input.streetNo}
					readOnly={!isEditable}
					onChange={isEditable ? handleChange : undefined}
				/>
				<label htmlFor="city" className="mt-2">City</label>
				<input
					id="city"
					type="text"
					className={stylingFormControl100}
					name="city"
					value={input.city}
					readOnly={!isEditable}
					onChange={isEditable ? handleChange : undefined}
				/>
				<label htmlFor="country" className="mt-2">Country</label>
				<input
					id="country"
					type="text"
					className={stylingFormControl100}
					name="country"
					value={input.country}
					readOnly={!isEditable}
					onChange={isEditable ? handleChange : undefined}
				/>
			</div>

			{
				showButton &&
				<button
					id="go-to-describe-place-button"
					type="submit"
					className="btn btn-light rounded-pill brand-color-background my-5 d-flex align-items-center"
				>
					Describe place next <Icon.ChevronRight />
				</button>
			}
		</form>
	);
}
