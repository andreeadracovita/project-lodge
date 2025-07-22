import axios from "axios";
import classNames from "classnames";
import countryToCurrency from "country-to-currency";
import { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import { useSearchParams } from "react-router";
import countries from "react-select-country-list";

import "./EditPropertyForm.css";
import FormBackButton from "./FormBackButton";
import FormPartTitleAddress from "./formParts/FormPartTitleAddress";
import FormPartDescription from "./formParts/FormPartDescription";
import FormPartPhotos from "./formParts/FormPartPhotos";
import FormPartPricing from "./formParts/FormPartPricing";
import FormPartReview from "./formParts/FormPartReview";
import PropertyListItem from "/src/components/list/PropertyListItem";
import { getPropertyById } from "/src/api/BackendApiService";
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

		priceNight: 0,
		isListed: false,
		localCurrency: ""
	});
	const [imagesUrlArray, setImagesUrlArray] = useState([]);
	const [pageTitle, setPageTitle] = useState("List your property");
	const [endButtonText, setEndButtonText] = useState("Publish property");

	const previewCheckIn = new Date();
	let previewCheckOut = new Date()
	previewCheckOut.setDate(previewCheckOut.getDate() + 3);

	useEffect(() => {
		// Editing an existing property
		const propId = searchParams.get("id");
		if (propId) {
			setPropertyId(propId);
			getPropertyById(propId)
				.then(response => {
					const data = response.data;
					if (data) {
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
							priceNight: data.price_night_local ?? 0,
							isListed: data.is_listed ?? false,
							localCurrency: data.local_currency ?? ""
						});
						setImagesUrlArray(photos ? photos : []);
						setPageTitle("Edit your property");
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

	function handleChangeCountry(value) {
		const countryLabel = countries().getLabel(value);
		setInput((prevValue) => {
			return {
				...prevValue,
				country: value,
				localCurrency: countryToCurrency[value]
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

	function handleChangeMultiselect(event, name) {
		const item = parseInt(event.target.id);

		let newValues = input[name];
		if (newValues.includes(item)) {
			newValues = newValues.filter(val => val !== item);
		} else {
			newValues.push(item);
		}
		setInput((prevValue) => {
			return {
				...prevValue,
				[name]: newValues
			}
		});
	}

	function getClassName(state) {
		return classNames(
			"text-bold",
			"d-flex",
			"align-items-center",
			{
				"brand-font-color": formState > state
			}
		);
	}

	return (
		<div>
			<div className="section-container d-flex justify-content-between">
				<div className={getClassName(0)}>
					{
						formState > 0
						? <Icon.CheckCircle size={24} />
						: <Icon.Icon1Circle size={24} />
					}
					<span className="ms-2">Title and address</span>
				</div>
				<div style={{ width: "50px"}}><hr /></div>
				<div className={getClassName(1)}>
					{
						formState > 1
						? <Icon.CheckCircle size={24} />
						: <Icon.Icon2Circle size={24} />
					}
					<span className="ms-2">Description</span>
				</div>
				<div style={{ width: "50px"}}><hr /></div>
				<div className={getClassName(2)}>
					{
						formState > 2
						? <Icon.CheckCircle size={24} />
						: <Icon.Icon3Circle size={24} />
					}
					<span className="ms-2">Photos</span>
				</div>
				<div style={{ width: "50px"}}><hr /></div>
				<div className={getClassName(3)}>
					{
						formState > 3
						? <Icon.CheckCircle size={24} />
						: <Icon.Icon4Circle size={24} />
					}
					<span className="ms-2">Pricing</span>
				</div>
				<div style={{ width: "50px"}}><hr /></div>
				<div className={getClassName(4)}>
					{
						formState > 4
						? <Icon.CheckCircle size={24} />
						: <Icon.Icon5Circle size={24} />
					}
					<span className="ms-2">Review</span>
				</div>
			</div>
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
								handleChangeCountry={handleChangeCountry}
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
								handleChangeFeatureMultiselect={(event) => handleChangeMultiselect(event, "featuresIds")}
								handleChangeExperienceMultiselect={(event) => handleChangeMultiselect(event, "experiencesIds")}
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
									submitButtonText={endButtonText}
								/>
							</div>
							<div className="col-6">
								<div className="col-7 pt-5 ms-5 sticky">
									<div id="preview">
										<PropertyListItem
											isPreview={true}
											item={{
												id: 0,
												title: input.title,
												city: input.city,
												country: input.country,
												price_night_site: input.priceNight,
												images_url_array: imagesUrlArray
											}}
											checkIn={previewCheckIn}
											checkOut={previewCheckOut}
											nightsCount={1}
											guests={1}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				}
			</div>
		</div>
	);
}
