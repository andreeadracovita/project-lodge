import * as Icon from "react-bootstrap-icons";

import FormPartTitleAddress from "./FormPartTitleAddress";
import FormPartDescription from "./FormPartDescription";
import FormPartPhotos from "./FormPartPhotos";
import FormPartPricing from "./FormPartPricing";

export default function FormPartReview({input, onButtonClicked}) {
	return (
		<div>
			<FormPartTitleAddress
				isEditable={false}
				showButton={false}
				input={input}
				handleChange={() => {}}
				onButtonClicked={onButtonClicked}
			/>

			<h2 className="mt-3">Description</h2>
			<FormPartDescription
				isEditable={false}
				showButton={false}
				showUnselectedFeatures={false}
				input={input}
				handleChange={() => {}}
				onButtonClicked={onButtonClicked}
				handleChangeMultiselect={() => {}}
			/>

			<h2 className="mt-3">Pricing</h2>
			<FormPartPricing
				isEditable={false}
				showButton={false}
				input={input}
				handleChange={() => {}}
				onButtonClicked={onButtonClicked}
			/>

			<button
				id="publish-property-button"
				type="button"
				className="btn btn-light rounded-pill brand-color-background my-5 d-flex align-items-center"
				onClick={onButtonClicked}
			>
				Publish property <Icon.ChevronRight />
			</button>
		</div>
	)
}
