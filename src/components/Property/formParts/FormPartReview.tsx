import * as Icon from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

import FormPartTitleAddress from "./FormPartTitleAddress";
import FormPartDescription from "./FormPartDescription";
import FormPartPhotos from "./FormPartPhotos";
import FormPartPricing from "./FormPartPricing";
import { updateProperty } from "/src/api/LodgeDbApiService";

export default function FormPartReview({ input, propertyId }) {
	const navigate = useNavigate();
	
	function onSubmit(event) {
		event.preventDefault();

		updateProperty(propertyId, {
			is_listed: true
		})
			.then(() => {
				navigate(`/stay?id=${propertyId}&guests=2`);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<div>
			<FormPartTitleAddress
				isEditable={false}
				showButton={false}
				input={input}
				handleChange={() => {}}
				onButtonClicked={() => {}}
			/>

			<h2 className="mt-3">Description</h2>
			<FormPartDescription
				isEditable={false}
				showButton={false}
				showUnselectedFeatures={false}
				input={input}
				handleChange={() => {}}
				onButtonClicked={() => {}}
				handleChangeMultiselect={() => {}}
			/>

			<h2 className="mt-3">Pricing</h2>
			<FormPartPricing
				isEditable={false}
				showButton={false}
				input={input}
				handleChange={() => {}}
				onButtonClicked={() => {}}
			/>

			<form onSubmit={onSubmit}>
				<button
					id="publish-property-button"
					type="submit"
					className="btn btn-light rounded-pill brand-color-background my-5 d-flex align-items-center"
				>
					Publish property <Icon.ChevronRight />
				</button>
			</form>
		</div>
	)
}
