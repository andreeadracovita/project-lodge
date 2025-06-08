import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

import PropertyPhotoGrid from "/src/components/Stay/PropertyPhotoGrid";
import { uploadPhotos, updatePropertyDetails } from "/src/api/BackendApiService";
import localisedString from "/src/localisation/en-GB";

export default function FormPartPhotos({ input, propertyId, handleChangePhotos, setImagesUrlArray, advanceState }) {
	
	async function onPhotosSubmit(event) {
		event.preventDefault();

		const files = event.target.photos.files;
		if (files.length === 0) {
			advanceState();
			return;
		}

		const data = new FormData();
		for (const file of files) {
			data.append("photos", file);
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

			<label htmlFor="main-photo" className="lato-bold mt-3">{ localisedString["hosting:add-photos"] }</label>
			<p className="mb-3">{ localisedString["hosting:add-photos-description"] }</p>
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
				{ localisedString["hosting:pricing-next"] } <Icon.ChevronRight />
			</button>
		</form>
	);
}
