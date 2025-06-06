import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import classNames from "classnames";

import { getAllBuildingTypes, getAllRentalTypes } from "/src/api/LodgeDbApiService";
import { capitalizeFirstLetter } from "/src/utils/StringUtils";

export default function FormPartTitleAddress({isEditable, showButton, input, handleChange, onButtonClicked}) {
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
	
	return (
		<form>
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
					type="button"
					className="btn btn-light rounded-pill brand-color-background my-5 d-flex align-items-center"
					onClick={onButtonClicked}
				>
					Describe place next <Icon.ChevronRight />
				</button>
			}
		</form>
	);
}
