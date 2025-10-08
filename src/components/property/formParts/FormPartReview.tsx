import { CheckCircleFill, ChevronRight, XCircleFill } from "react-bootstrap-icons";
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

			{
				(input.photos.length === 0 || !(input.priceNight > 0)) &&
				<div className="mt-10">
					<div className="alert alert-warning" role="alert">
						To publish a property:<br />
						
						{
							input.photos.length === 0
							? <XCircleFill size={14} color="#CC0000" />
							: <CheckCircleFill size={14} color="green" />
						}
						<span className="ms-1">it must contain at least one photo</span><br />
						
						{
							input.priceNight > 0
							? <CheckCircleFill size={14} color="green" />
							: <XCircleFill size={14} color="#CC0000" />
						}
						<span className="ms-1">price must be higher than 0</span>
					</div>
				</div>
			}

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
							disabled={input.photos.length === 0 || !(input.priceNight > 0)}
						>
							Save and publish property <ChevronRight />
						</button>
					}
				</div>
			</form>
		</div>
	)
}
