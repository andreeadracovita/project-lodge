import { ChevronRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import FormPartTitleAddress from "./FormPartTitleAddress";
import FormPartDescription from "./FormPartDescription";
import FormPartPricing from "./FormPartPricing";
import { updateProperty } from "api/BackendApiService";

type FormPartReviewProps = {
	input: any,
	propertyId: number
};

export default function FormPartReview({ input, propertyId }: FormPartReviewProps) {
	const navigate = useNavigate();
	
	function onSubmit(event: any) {
		event.preventDefault();

		const submitter = event.nativeEvent.submitter.name;
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
				handleChange={undefined}
				propertyId={propertyId}
				advanceState={undefined}
				setPropertyId={undefined}
				handleChangeCountry={undefined}
			/>

			<h2 className="section-heading mt-10">Description</h2>
			<FormPartDescription
				isEditable={false}
				showButton={false}
				input={input}
				handleChange={undefined}
				handleChangeFeatureMultiselect={undefined}
				handleChangeExperienceMultiselect={undefined}
				propertyId={propertyId}
				advanceState={undefined}
			/>

			<h2 className="section-heading mt-10">Pricing</h2>
			<FormPartPricing
				isEditable={false}
				showButton={false}
				input={input}
				handleChange={undefined}
				propertyId={propertyId}
				advanceState={undefined}
			/>

			<form onSubmit={onSubmit}>
				<div className="d-flex my-5">
					<button
						id="publish-property-button"
						type="submit"
						name="save"
						className="btn-pill"
					>
						Save <ChevronRight />
					</button>
					{
						input.isListed === false &&
						<button
							id="publish-property-button"
							type="submit"
							name="publish"
							className="btn-pill ms-2"
						>
							Save and publish property <ChevronRight />
						</button>
					}
				</div>
			</form>
		</div>
	)
}
