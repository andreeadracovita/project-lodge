import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

import FormBackButton from "./FormBackButton";
import FormPartTitleAddress from "./FormPartTitleAddress";
import FormPartDescription from "./FormPartDescription";
import FormPartPhotos from "./FormPartPhotos";
import FormPartPricing from "./FormPartPricing";
import FormPartReview from "./FormPartReview";
import ListItem from "/src/components/ListItem";
import "./AddPropertyForm.css";

function AddPropertyForm() {
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
		bathrooms: 1,
		features_ids: [],
		photos: [],
		pricePerNight: "" // price per night converted from session/account currency to eur as it is stored in db
	});

	const [formState, setFormState] = useState(0);
	const finalState = 4;

	function onButtonClicked() {
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
		<>
			<form>
				{
					formState === 0 &&
					<div id="state-title-address" className="row">
						<div className="col-6">
							<h1>List your property</h1>
							<FormPartTitleAddress
								isEditable={true}
								showButton={true}
								input={input}
								handleChange={handleChange}
								onButtonClicked={onButtonClicked}
							/>
						</div>
						<div className="col-6">
							<img src="/images/add-property-house.jpg" className="add-property-img" />
						</div>
					</div>
				}
				{
					formState === 1 &&
					<div id="state-describe" className="row">
						<div className="col-6">
							<FormBackButton onButtonClicked={onBackClicked} />
							<h1>Describe your property</h1>
							<FormPartDescription
								isEditable={true}
								showButton={true}
								showUnselectedFeatures={true}
								input={input}
								handleChange={handleChange}
								onButtonClicked={onButtonClicked}
								handleChangeMultiselect={handleChangeMultiselect}
							/>
						</div>
						<div className="col-6">
							<img src="/images/add-property-room.jpg" className="add-property-img" />
						</div>
					</div>
				}
				{
					formState === 2 &&
					<div id="state-photos">
						<FormBackButton onButtonClicked={onBackClicked} />
						<h1>Showcase your property</h1>
						<FormPartPhotos
							isEditable={true}
							showButton={true}
							input={input}
							handleChange={handleChange}
							onButtonClicked={onButtonClicked}
							handleChangePhotoUpload={handleChangePhotoUpload}
						/>
					</div>
				}
				{
					formState === 3 &&
					<div id="state-pricing" className="row">
						<div className="col-6">
							<FormBackButton onButtonClicked={onBackClicked} />
							<h1>Pricing</h1>
							<FormPartPricing
								isEditable={true}
								showButton={true}
								input={input}
								handleChange={handleChange}
								onButtonClicked={onButtonClicked}
							/>
						</div>
						<div className="col-6">
							<img src="/images/add-property-pricing-1.jpg" className="add-property-img" />
						</div>
					</div>
				}
				{
					formState === 4 &&
					<div>
						<div id="state-review" className="row">
							<div className="col-6">
								<FormBackButton onButtonClicked={onBackClicked} />
								<h1>Review your property</h1>
								<FormPartReview
									input={input}
									onButtonClicked={onButtonClicked}
									handleChange={handleChange}
									handleChangeMultiselect={handleChangeMultiselect}
								/>
							</div>
							<div className="col-6">
								<div className="col-8 pt-5 ms-5 sticky">
									<div id="preview">
										<ListItem
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
		</>
	);
}

export default AddPropertyForm;