import { useEffect, useState } from "react";
import imageType, { minimumBytes } from "image-type";
import { readChunk } from "read-chunk";
import * as Icon from "react-bootstrap-icons";

import PropertyPhotoGrid from "/src/components/Stay/PropertyPhotoGrid";

export default function FormPartPhotos({input, handleChangePhotos}) {

	// TODO: move to utils
	async function isFileImage(file) {
		const buffer = await readChunk("/property_img/00000001_1.jpg", {length: minimumBytes});
		console.log(buffer);
		const type = await imageType(buffer);
		console.log(type);
		if (type === "image/jpeg" || type === "image/png" || type === "image/jpg") {
			return true;
		}
		return false;
	}

	async function uploadFile(file) {
		if (file) {
			console.log("Uploading file...");

			const formData = new FormData();
			formData.append("file", file);

			try {
				const result = await fetch("http://localhost:3000/upload", {
					method: "POST",
					body: formData
				});
				const data = await result.json();

				console.log(data);
			} catch (error) {
				console.error(error);
			}
		}
	}

	function onPhotosSubmit(event) {
		event.preventDefault();
		// Check type

		// Upload photos
		const formData = new FormData(event.target);
		const inputFile = formData.get("photos");
		uploadFile(inputFile);
		
		// updatePropertyDetails(propertyId, { images_url_array: [photos]})
	}

	return (
		<form onSubmit={onPhotosSubmit} encType="multipart/form-data">
			<PropertyPhotoGrid urlArray={input.photos}/>

			<label htmlFor="main-photo" className="lato-bold mt-3">Add photos</label>
			<p className="mb-3">The first photo will be displayed in search results</p>
			<input
				type="file"
				className="form-control rounded-pill w-50"
				name="photos"
				// multiple
				onChange={handleChangePhotos}
			/>

			<button
				id="go-to-pricing-button"
				type="submit"
				className="btn btn-light rounded-pill brand-color-background my-5 d-flex align-items-center"
			>
				Pricing next <Icon.ChevronRight />
			</button>
		</form>
	);
}
