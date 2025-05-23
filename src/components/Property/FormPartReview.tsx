import * as Icon from "react-bootstrap-icons";

import FormPartTitleAddress from "./FormPartTitleAddress";
import FormPartDescription from "./FormPartDescription";
import FormPartPhotos from "./FormPartPhotos";
import FormPartPricing from "./FormPartPricing";

function FormPartReview({input, onButtonClicked, handleChange, handleChangeMultiselect}) {
	return (
		<div>
			<FormPartTitleAddress
				isEditable={false}
				showButton={false}
				input={input}
				handleChange={handleChange}
				onButtonClicked={onButtonClicked}
			/>

			<h2 className="mt-3">Description</h2>
			<FormPartDescription
				isEditable={false}
				showButton={false}
				showUnselectedFeatures={false}
				input={input}
				handleChange={handleChange}
				onButtonClicked={onButtonClicked}
				handleChangeMultiselect={handleChangeMultiselect}
			/>

			<h2 className="mt-3">Pricing</h2>
			<FormPartPricing
				isEditable={false}
				showButton={false}
				input={input}
				handleChange={handleChange}
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

export default FormPartReview;