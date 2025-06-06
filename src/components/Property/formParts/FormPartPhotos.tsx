import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

import PropertyPhotoGrid from "/src/components/Stay/PropertyPhotoGrid";
import { uploadPhotos } from "/src/api/LodgeDbApiService";
import { updatePropertyDetails } from "/src/api/LodgeDbApiService";

export default function FormPartPhotos({ input, propertyId, handleChangePhotos, setImagesUrlArray, advanceState }) {
	
	async function onPhotosSubmit(event) {
		event.preventDefault();

		// Upload photos
		const files = event.target.photos.files;
		const data = new FormData();
		// Append files
		if (files.length !== 0) {
			for (const file of files) {
				data.append("photos", file);
			}
		}

		uploadPhotos(data)
			.then(response => {
				updatePropertyDetails(propertyId, { images_url_array: response.data.filenames })
					.then(() => {
						setImagesUrlArray(response.data.filenames);
						advanceState();
					})
					.catch((error) => {
						console.error(error);
					});
			})
			.catch(error => {
				console.error(error);
			});
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
				multiple="multiple"
				onChange={handleChangePhotos}
				accept="image/png, image/jpeg"
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
