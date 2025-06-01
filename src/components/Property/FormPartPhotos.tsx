import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

import PropertyPhotoGrid from "/src/components/Stay/PropertyPhotoGrid";

export default function FormPartPhotos({input, handleChange, onButtonClicked, handleChangePhotoUpload}) {

	return (
		<div>
			<PropertyPhotoGrid urlArray={input.photos}/>

			<label htmlFor="main-photo" className="lato-bold mt-3">Add photos</label>
			<p className="mb-3">The first photo will be displayed in search results</p>
			<input
				id="photos"
				type="file"
				className="form-control rounded-pill w-50"
				name="photos"
				multiple
				onChange={handleChangePhotoUpload}
			/>

			<button
				id="go-to-pricing-button"
				type="button"
				className="btn btn-light rounded-pill brand-color-background my-5 d-flex align-items-center"
				onClick={onButtonClicked}
			>
				Pricing next <Icon.ChevronRight />
			</button>
		</div>
	);
}
