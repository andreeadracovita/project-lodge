import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

import { uploadPhotos, updateProperty } from "/src/api/BackendApiService";
import FormError from "/src/components/common/FormError";
import PropertyPhotoGrid from "/src/components/Stay/PropertyPhotoGrid";

export default function FormPartPhotos({ input, propertyId, handleChangePhotos, setImagesUrlArray, advanceState }) {
	const [errors, setErrors] = useState([]);
	
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
			.then(uploadResponse => {
				const filenames = uploadResponse.data.filenames;
				updateProperty(propertyId, { images_url_array: filenames })
					.then(updateResponse => {
						const errors = updateResponse.data.errors;
						if (errors) {
							setErrors(errors);
							return;
						}
						setImagesUrlArray(filenames);
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

			<label htmlFor="main-photo" className="lato-bold mt-3">Add photos <span className="text-red">*</span></label>
			<div className="mb-3">The first photo will be displayed in search results</div>
			<input
				type="file"
				className="form-control rounded-pill w-50"
				name="photos"
				multiple="multiple"
				onChange={handleChangePhotos}
				accept="image/png, image/jpeg"
				required
			/>
			<FormError errors={errors} />

			<button
				id="go-to-pricing-button"
				type="submit"
				className="btn-pill my-5 d-flex align-items-center"
			>
				Pricing next <Icon.ChevronRight />
			</button>
		</form>
	);
}
