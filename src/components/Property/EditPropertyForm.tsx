import axios from "axios";
import { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import { useSearchParams } from "react-router";

import "./EditPropertyForm.css";
import FormBackButton from "./FormBackButton";
import FormPartTitleAddress from "./formParts/FormPartTitleAddress";
import FormPartDescription from "./formParts/FormPartDescription";
import FormPartPhotos from "./formParts/FormPartPhotos";
import FormPartPricing from "./formParts/FormPartPricing";
import FormPartReview from "./formParts/FormPartReview";
import PropertyListItem from "/src/components/list/PropertyListItem";
import { getPropertyById } from "/src/api/BackendApiService";
import localisedString from "/src/localisation/en-GB";
import { fileStorage } from "/src/utils/constants";

export default function EditPropertyForm() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [propertyId, setPropertyId] = useState();
	const [input, setInput] = useState({
		title: "",
		city: "",
		country: "",
		street: "",
		streetNo: "",

		description: "",
		buildingType: 1,
		rentalType: 1,
		guests: 1,
		beds: 1,
		bedrooms: 1,
		bathrooms: 1,
		featuresIds: [],
		experiencesIds: [],

		photos: [],

		pricePerNight: 0,
		isListed: false
	});
	const [imagesUrlArray, setImagesUrlArray] = useState([]);
	const [pageTitle, setPageTitle] = useState(localisedString["hosting:list-property"]);
	const [endButtonText, setEndButtonText] = useState(localisedString["hosting:publish-property"]);

	useEffect(() => {
		if (searchParams.get("id")) {
			setPropertyId(searchParams.get("id"));

			// Init propertyId, input, imagesUrlArray with data from db
			getPropertyById(searchParams.get("id"))
				.then(response => {
					if (response.data?.length > 0) {
						const data = response.data[0];
						const photos = data.images_url_array;
						setInput({
							title: data.title,
							city: data.city,
							country: data.country,
							street: data.street,
							streetNo: data.street_no,
							buildingType: data.building_type_id,
							rentalType: data.rental_type_id,

							description: data.description ?? "",
							guests: data.guests ?? 1,
							beds: data.beds ?? 1,
							bedrooms: data.bedrooms ?? 1,
							bathrooms: data.bathrooms ?? 1,
							featuresIds: data.features_ids ?? [],
							experiencesIds: data.experiences_ids ?? [],
							photos: photos ? photos.map(url => fileStorage + url) : [],
							pricePerNight: data.price_per_night_eur ?? 0,
							isListed: data.is_listed ?? false
						});
						setImagesUrlArray(photos ? photos : []);
						setPageTitle(localisedString["hosting:edit-property"]);
					}
				})
				.catch(error => {
					console.error(error);
				});
		}
	}, []);

	const [formState, setFormState] = useState(0);
	const finalState = 4;

	function advanceState() {
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

		let newFeaturesValue = input.featuresIds;
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

		let newExperiencesValue = input.experiencesIds;
		if (newExperiencesValue.includes(selected)) {
			newExperiencesValue = newExperiencesValue.filter(e => e !== selected);
		} else {
			newExperiencesValue.push(selected);
		}
		setInput((prevValue) => {
			return {
				...prevValue,
				experiencesIds: newExperiencesValue
			}
		});
	}

	return (
		<div className="section-container">
			{
				formState === 0 &&
				<div id="state-title-address" className="row">
					<div className="col-6">
						<h1 className="page-heading">{ pageTitle }</h1>
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
						<h1 className="page-heading">{ localisedString["hosting:describe-property"] }</h1>
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
					<h1 className="page-heading">{ localisedString["hosting:showcase-property"] }</h1>
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
						<h1 className="page-heading">{ localisedString["hosting:pricing"] }</h1>
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
							<h1 className="page-heading">{ localisedString["hosting:review-property"] }</h1>
							<FormPartReview
								input={input}
								propertyId={propertyId}
								submitButtonText={endButtonText}
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
