import classNames from "classnames";
import { useEffect, useState } from "react";
import { ChevronRight } from "react-bootstrap-icons";
import countries from "react-select-country-list";

import {
	createNewProperty,
	getAllPropertyTypes,
	getAllRentalTypes,
	getGeolocation,
	updateProperty
} from "api/BackendApiService";
import CountrySelect from "components/common/CountrySelect";
import FormError from "components/common/FormError";
import MapView from "components/map/MapView";
import { capitalizeFirstLetter } from "utils/stringUtils";

type FormPartTitleAddressProps = {
	isEditable: boolean,
	showButton: boolean,
	input: any,
	propertyId: number | undefined,
	setPropertyId: any,
	handleChange: any,
	handleChangeCountry: any,
	advanceState: any
};

export default function FormPartTitleAddress({
	isEditable,
	showButton,
	input,
	propertyId,
	setPropertyId,
	handleChange,
	handleChangeCountry,
	advanceState
}: FormPartTitleAddressProps) {
	const [buildingTypes, setBuildingTypes] = useState([]);
	const [rentalTypes, setRentalTypes] = useState([]);
	const [geoCoords, setGeoCoords] = useState<number[] | undefined>();
	const [errors, setErrors] = useState<string[]>([]);
	let pickedGeo = input.geo ?? [];

	useEffect(() => {
		if (input.geo) {
			setGeoCoords(input.geo);
			pickedGeo = input.geo;
		}
	}, [input.geo]);

	useEffect(() => {
		getAllPropertyTypes()
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

	function setPickedGeo(coords: number[]) {
		pickedGeo = coords;
	}

	const stylingFormControl100 = classNames(
		"form-control",
		"w-100",
		{
			"text-muted": !isEditable
		}
	);

	async function handleLocateClick() {
		if (input.city === "" || input.country === "" || input.street === "") {
			setErrors(["Fill in address fields"]);
			return;
		}

		const countryLabel = countries().getLabel(input.country);
		const address = input.city + "+" + input.street + "+" + countryLabel;
		getGeolocation(address)
			.then(response => {
				if (response.data.length > 0) {
					setErrors([]);
					const data = response.data[0];
					setGeoCoords([Number(data.lat), Number(data.lon)]);
				} else {
					getGeolocation(input.city + "+" + countryLabel)
						.then(response => {
							if (response.data.length > 0) {
								setErrors([]);
								const data = response.data[0];
								setGeoCoords([Number(data.lat), Number(data.lon)]);
							} else {
								setErrors(["No geographical location identified for given address. Check if city and country are correct."]);
							}
						})
						.catch(error => {
							console.error(error);
						});
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	/**
	 * Create a new property
	 */
	async function createProperty() {
		const payload = {
			title: input.title,
			geo: { x: pickedGeo[0], y: pickedGeo[1] },
			city: input.city,
			country: input.country,
			street: input.street,
			street_no: input.streetNo,
			building_type_id: parseInt(input.buildingType),
			rental_type_id: parseInt(input.rentalType),
			local_currency: input.localCurrency
		};
		createNewProperty(payload)
			.then(response => {
				const errors = response.data.errors;
				if (errors) {
					setErrors(errors);
					return;
				}
				const propId = response.data.id;
				if (propId) {
					setPropertyId(propId);
					advanceState();
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	/**
	 * Update existing property
	 */
	async function patchProperty() {
		if (!propertyId) {
			return;
		}
		const payload = {
			title: input.title,
			geo: { x: pickedGeo[0], y: pickedGeo[1] },
			city: input.city,
			country: input.country,
			building_type_id: parseInt(input.buildingType),
			rental_type_id: parseInt(input.rentalType),
			street: input.street,
			street_no: input.streetNo,
			local_currency: input.localCurrency
		};
		updateProperty(propertyId, payload)
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

	/**
	 * 1. Create property entry & property_details entry with partial details. (is_listed is false by default)
	 * 2. If back and edit, patch entry with new details.
	 */
	async function onSubmit(event: any) {
		event.preventDefault();

		if (input.title === "" || input.city === "" || input.country === "" || input.street === "" || input.streetNo === "" || !geoCoords) {
			setErrors(["Fill in all mandatory fields (marked with *)"]);
			return;
		}

		if (!propertyId) {
			createProperty();
		} else {
			patchProperty();
		}
	}
	
	return (
		<form onSubmit={onSubmit}>
			<label htmlFor="title">Title <span className="text-red">*</span></label>
			<input
				id="title"
				type="text"
				className={stylingFormControl100}
				name="title"
				value={input.title}
				readOnly={!isEditable}
				onChange={handleChange}
				maxLength={50}
				required
			/>

			<label htmlFor="buildingType" className="mt-2">Type of building <span className="text-red">*</span></label>
			<select
				id="buildingType"
				className={stylingFormControl100}
				name="buildingType"
				value={input.buildingType ?? 1}
				disabled={!isEditable}
				onChange={handleChange}
				required
			>
				{
					buildingTypes.map((type: any) => 
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
				disabled={!isEditable}
				onChange={handleChange}
				required
			>
				{
					rentalTypes.map((type: any) => 
						<option key={type.id} value={type.id}>{capitalizeFirstLetter(type.name)}</option>
					)
				}
			</select>

			<div id="address" className="mt-10">
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
					maxLength={50}
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
					maxLength={10}
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
					maxLength={50}
					required
				/>
				<label htmlFor="country" className="mt-2">Country <span className="text-red">*</span></label>
				{
					isEditable
					? <CountrySelect id="country" initialValue={input.country} handleFormChange={handleChangeCountry} />
					: <div className={stylingFormControl100}>{countries().getLabel(input.country)}</div>
				}
				{
					isEditable && geoCoords &&
					<div className="mt-10">
						<MapView
							id="map"
							height={300}
							center={geoCoords}
							zoom={14}
							points={[geoCoords]}
							isEditable={true}
							updatePinPosition={setPickedGeo}
							boundingbox={undefined}
							updateIdsMap={undefined}
							handleHighlightItem={undefined}
							shouldShowText={undefined}
							priceMap={undefined}
						/>
						<div>Drag pin on map to your property's location</div>
					</div>
				}
				{
					isEditable && !geoCoords &&
					<button className="btn-pill mt-10" type="button" onClick={handleLocateClick}>Locate on map</button>
				}
				
			</div>
			<FormError errors={errors} />

			{
				showButton &&
				<button
					id="go-to-describe-place-button"
					type="submit"
					className="btn-pill my-5"
				>
					Describe place next <ChevronRight />
				</button>
			}
		</form>
	);
}
