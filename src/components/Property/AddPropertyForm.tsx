import axios from "axios";
import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

import "./AddPropertyForm.css";
import FormBackButton from "./FormBackButton";
import FormPartTitleAddress from "./FormPartTitleAddress";
import FormPartDescription from "./FormPartDescription";
import FormPartPhotos from "./FormPartPhotos";
import FormPartPricing from "./FormPartPricing";
import FormPartReview from "./FormPartReview";
import PropertyListItem from "/src/components/list/PropertyListItem";
import {
	createNewProperty,
	createNewPropertyDetailBase,
	updateProperty,
	updatePropertyDetails
} from "/src/api/LodgeDbApiService";

export default function AddPropertyForm() {
	const [propertyId, setPropertyId] = useState();
	const [input, setInput] = useState({
		title: "",
		city: "",
		country: "",
		street: "",
		streetNo: "",

		description: "",
		buildingType: "0",
		rentalType: "0",
		guests: 1,
		beds: 1,
		bedrooms: 1,
		bathrooms: 1,
		features_ids: [],

		photos: [],

		pricePerNight: "" // price per night converted from session/account currency to eur as it is stored in db
	});

	const [formState, setFormState] = useState(0);
	const finalState = 4;

	function advanceState() {
		// Validates input

		// Remain on page if invalid input

		// Call DB API to Create property entry

		// Navigate to Manage Properties page to see the newly added entry
		// navigate("//hosting/properties");

		if (formState < finalState) {
			setFormState(formState + 1);
		} else {
			console.log("Add property to db");
		}
	}

	async function createPropertyDetail(propertyId: int) {
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

	async function createProperty(geo) {
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

				createPropertyDetail(propertyId);
			})
			.catch(error => {
				console.error(error);
			});
	}

	/**
	 * 1. Create property entry & property_details entry with partial details. (is_listed is false by default)
	 * 2. If back and edit, patch entry with new details.
	 */
	function onBaseSubmit() {
		if (!input.title || !input.city || !input.country || !input.street || !input.streetNo) {
			console.error("Must fill in all fields!");
			return;
		}

		const address = input.city + "+" + input.street + "+" + input.streetNo + "+" + input.country;
		axios.get(`https://geocode.maps.co/search?q=${address}&api_key=6829981227127748709913iypd29e39`)
			.then(response => {
				console.log(response.data);
				if (response.data.length > 0) {
					const data = response.data[0];
					const geo = { x: data.lat, y: data.lon };
					if (!propertyId) {
						createProperty(geo);
					} else {
						// Update property
						updateProperty(propertyId, { title: "This is a new title" });
						updatePropertyDetails(propertyId, { description: "This is a new description "});
					}
				}
			})
			.catch(error => {
				console.error(error);
			});

		
	}

	function onBackClicked() {
		setFormState(formState - 1);
	}

	function handleChange(event) {
		const { value, name } = event.target;

		setInput((prevValue) => {
			return {
				...prevValue,
				[name]: value
			}
		});
	}

	function handleChangePhotoUpload(event) {
		const urls = Array.from(event.target.files).map((photo) => URL.createObjectURL(photo));

		setInput((prevValue) => {
			return {
				...prevValue,
				photos: urls
			}
		})
	}

	function handleChangeMultiselect(event) {
		const selected = parseInt(event.target.id);

		let newFeaturesValue = input.features_ids;
		if (newFeaturesValue.includes(selected)) {
			newFeaturesValue = newFeaturesValue.filter(f => f !== selected);
		} else {
			newFeaturesValue.push(selected);
		}
		console.log(newFeaturesValue);
		setInput((prevValue) => {
			return {
				...prevValue,
				features_ids: newFeaturesValue
			}
		});
	}

	return (
		<div className="section-container">
			<form>
				{
					formState === 0 &&
					<div id="state-title-address" className="row">
						<div className="col-6">
							<h1 className="page-heading">List your property</h1>
							<FormPartTitleAddress
								isEditable={true}
								showButton={true}
								input={input}
								handleChange={handleChange}
								onButtonClicked={onBaseSubmit}
							/>
						</div>
						<div className="col-6">
							<img src="/graphics/add-property-house.jpg" className="add-property-img" />
						</div>
					</div>
				}
				{
					formState === 1 &&
					<div id="state-describe" className="row">
						<div className="col-6">
							<FormBackButton onButtonClicked={onBackClicked} />
							<h1 className="page-heading">Describe your property</h1>
							<FormPartDescription
								isEditable={true}
								showButton={true}
								showUnselectedFeatures={true}
								input={input}
								handleChange={handleChange}
								onButtonClicked={advanceState}
								handleChangeMultiselect={handleChangeMultiselect}
							/>
						</div>
						<div className="col-6">
							<img src="/graphics/add-property-room.jpg" className="add-property-img" />
						</div>
					</div>
				}
				{
					formState === 2 &&
					<div id="state-photos">
						<FormBackButton onButtonClicked={onBackClicked} />
						<h1 className="page-heading">Showcase your property</h1>
						<FormPartPhotos
							isEditable={true}
							showButton={true}
							input={input}
							handleChange={handleChange}
							onButtonClicked={advanceState}
							handleChangePhotoUpload={handleChangePhotoUpload}
						/>
					</div>
				}
				{
					formState === 3 &&
					<div id="state-pricing" className="row">
						<div className="col-6">
							<FormBackButton onButtonClicked={onBackClicked} />
							<h1 className="page-heading">Pricing</h1>
							<FormPartPricing
								isEditable={true}
								showButton={true}
								input={input}
								handleChange={handleChange}
								onButtonClicked={advanceState}
							/>
						</div>
						<div className="col-6">
							<img src="/graphics/add-property-pricing-1.jpg" className="add-property-img" />
						</div>
					</div>
				}
				{
					formState === 4 &&
					<div>
						<div id="state-review" className="row">
							<div className="col-6">
								<FormBackButton onButtonClicked={onBackClicked} />
								<h1 className="page-heading">Review your property</h1>
								<FormPartReview
									input={input}
									onButtonClicked={advanceState}
									handleChange={handleChange}
									handleChangeMultiselect={handleChangeMultiselect}
								/>
							</div>
							<div className="col-6">
								<div className="col-8 pt-5 ms-5 sticky">
									<div id="preview">
										<PropertyListItem
											isLink={false}
											id={-1}
											img_url={input.photos && input.photos.length > 0 ? input.photos[0] : null}
											title={input.title}
											city={input.city}
											country={input.country}
											price={input.pricePerNight}
											currency={"CHF"}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				}
			</form>
		</div>
	);
}
