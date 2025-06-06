import axios from "axios";
import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

import "./AddPropertyForm.css";
import FormBackButton from "./FormBackButton";
import FormPartTitleAddress from "./formParts/FormPartTitleAddress";
import FormPartDescription from "./formParts/FormPartDescription";
import FormPartPhotos from "./formParts/FormPartPhotos";
import FormPartPricing from "./formParts/FormPartPricing";
import FormPartReview from "./formParts/FormPartReview";
import PropertyListItem from "/src/components/list/PropertyListItem";

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
		experiences_ids: [],

		photos: [],

		pricePerNight: ""
	});

	const [imagesUrlArray, setImagesUrlArray] = useState([]); 

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
		}
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

	async function handleChangePhotos(event) {
		const fileArray = Array.from(event.target.files);
		const urls = fileArray.map((photo) => URL.createObjectURL(photo));

		setInput((prevValue) => {
			return {
				...prevValue,
				photos: urls
			}
		});
	}

	function handleChangeFeatureMultiselect(event) {
		const selected = parseInt(event.target.id);

		let newFeaturesValue = input.features_ids;
		if (newFeaturesValue.includes(selected)) {
			newFeaturesValue = newFeaturesValue.filter(f => f !== selected);
		} else {
			newFeaturesValue.push(selected);
		}
		setInput((prevValue) => {
			return {
				...prevValue,
				features_ids: newFeaturesValue
			}
		});
	}

	function handleChangeExperienceMultiselect(event) {
		const selected = parseInt(event.target.id);

		let newExperiencesValue = input.experiences_ids;
		if (newExperiencesValue.includes(selected)) {
			newExperiencesValue = newExperiencesValue.filter(e => e !== selected);
		} else {
			newExperiencesValue.push(selected);
		}
		setInput((prevValue) => {
			return {
				...prevValue,
				experiences_ids: newExperiencesValue
			}
		});
	}

	return (
		<div className="section-container">
			{
				formState === 0 &&
				<div id="state-title-address" className="row">
					<div className="col-6">
						<h1 className="page-heading">List your property</h1>
						<FormPartTitleAddress
							isEditable={true}
							showButton={true}
							input={input}
							propertyId={propertyId}
							setPropertyId={setPropertyId}
							handleChange={handleChange}
							advanceState={advanceState}
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
							propertyId={propertyId}
							handleChange={handleChange}
							handleChangeFeatureMultiselect={handleChangeFeatureMultiselect}
							handleChangeExperienceMultiselect={handleChangeExperienceMultiselect}
							advanceState={advanceState}
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
						propertyId={propertyId}
						handleChangePhotos={handleChangePhotos}
						setImagesUrlArray={setImagesUrlArray}
						advanceState={advanceState}
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
							propertyId={propertyId}
							handleChange={handleChange}
							advanceState={advanceState}
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
								propertyId={propertyId}
							/>
						</div>
						<div className="col-6">
							<div className="col-8 pt-5 ms-5 sticky">
								<div id="preview">
									<PropertyListItem
										isLink={false}
										item={{
											id: 0,
											title: input.title,
											city: input.city,
											country: input.country,
											price: input.price,
											images_url_array: imagesUrlArray
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			}
		</div>
	);
}
