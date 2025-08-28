import { useState } from "react";
import { ChevronRight } from "react-bootstrap-icons";

import { uploadPhotos, updateProperty } from "api/BackendApiService";
import FormError from "components/common/FormError";
import PropertyPhotoGrid from "components/stay/PropertyPhotoGrid";

type FormPartPhotosProps = {
	input: any,
	propertyId: number,
	handleChangePhotos: any,
	setImagesUrlArray: any,
	advanceState: any
};

export default function FormPartPhotos({ input, propertyId, handleChangePhotos, setImagesUrlArray, advanceState }: FormPartPhotosProps) {
	const [errors, setErrors] = useState<string[]>([]);

	function handleChange(event: any) {
		// Check for file limit
		const files = event.target.files;
		for (const file of files) {
			if (file.size > 6 * 1024 * 1024) {
				setErrors(["Image size is too big. All images must be smaller than 6 MB."]);
				return;
			}
		}
		setErrors([]);
		handleChangePhotos(event);
	}
	
	async function onPhotosSubmit(event: any) {
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

			<label htmlFor="main-photo" className="text-bold mt-3">Add photos</label>
			<div className="mb-3">The first photo will be displayed in search results</div>
			<input
				type="file"
				className="form-control rounded-pill w-50"
				name="photos"
				multiple={true}
				onChange={handleChange}
				accept="image/png, image/jpeg"
			/>
			<div className="mt-6">
				<FormError errors={errors} />
			</div>

			<button
				id="go-to-pricing-button"
				type="submit"
				className="btn-pill my-5"
			>
				Pricing next <ChevronRight />
			</button>
		</form>
	);
}
