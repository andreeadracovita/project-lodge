import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import FormPartTitleAddress from "./FormPartTitleAddress";
import FormPartDescription from "./FormPartDescription";
import FormPartPhotos from "./FormPartPhotos";
import FormPartPricing from "./FormPartPricing";
import { updateProperty } from "/src/api/BackendApiService";
import localisedString from "/src/localisation/en-GB";

export default function FormPartReview({ input, propertyId }) {
	const navigate = useNavigate();
	
	function onSubmit(event) {
		event.preventDefault();

		const submitter = event.nativeEvent.submitter.name;
		console.log(submitter);
		switch (submitter) {
			case "save":
				navigate(`/stay?id=${propertyId}&guests=2`);
				return;
			case "publish":
				updateProperty(propertyId, {
					is_listed: true
				})
					.then(() => {
						navigate(`/stay?id=${propertyId}&guests=2`);
					})
					.catch((error) => {
						console.error(error);
					});
				return;
			default: {}
		}
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

			<h2 className="mt-3">{ localisedString["hosting:description"] }</h2>
			<FormPartDescription
				isEditable={false}
				showButton={false}
				showUnselectedFeatures={false}
				input={input}
				handleChange={() => {}}
				onButtonClicked={() => {}}
				handleChangeMultiselect={() => {}}
			/>

			<h2 className="mt-3">{ localisedString["hosting:pricing"] }</h2>
			<FormPartPricing
				isEditable={false}
				showButton={false}
				input={input}
				handleChange={() => {}}
				onButtonClicked={() => {}}
			/>

			<form onSubmit={onSubmit}>
				<div className="d-flex my-5">
					<button
						id="publish-property-button"
						type="submit"
						name="save"
						className="btn btn-light rounded-pill brand-color-background d-flex align-items-center"
					>
						{ localisedString["hosting:save-edit"] } <Icon.ChevronRight />
					</button>
					{
						input.isListed === false &&
						<button
							id="publish-property-button"
							type="submit"
							name="publish"
							className="btn btn-light rounded-pill brand-color-background ms-2 d-flex align-items-center"
						>
							{ localisedString["hosting:publish-property"] } <Icon.ChevronRight />
						</button>
					}
				</div>
			</form>
		</div>
	)
}
