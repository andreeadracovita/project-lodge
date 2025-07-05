import { useState } from "react";
import { useSearchParams } from "react-router";

import StarRating from "./StarRating";
import { addReviewForBookingId } from "/src/api/BackendApiService";

export default function ReviewForm({ propertyId }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [input, setInput] = useState({
		rating: 0,
		title: "",
		body: "",
		property_id: propertyId
	});
	const bookingId = searchParams.get("booking_id");

	function handleChange(event) {
		const { value, name } = event.target;

		setInput((prevValue) => {
			return {
				...prevValue,
				[name]: value
			}
		});
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (!bookingId || input.rating === 0) {
			return;
		}

		addReviewForBookingId(bookingId, input)
			.then(response => {
				const errors = response.data.errors;
				if (errors) {
					setErrors(errors);
					return;
				}
				// TODO redirect somewhere?
			})
			.catch(error => {
				console.error(error);
			});
	}
	
	return (
		<form onSubmit={handleSubmit}>
			<label className="mt-10">How do you rate your overall experience? <span className="text-red">*</span></label>
			<StarRating value={input.rating} handleChange={handleChange} />

			<label htmlFor="title" className="mt-10">Short description</label>
			<input id="title" type="text" name="title" value={input.title} onChange={handleChange} className="form-control w-75"/>

			<label htmlFor="body" className="mt-10">Tell us more about your stay</label>
			<textarea
				id="body"
				name="body"
				value={input.body}
				onChange={handleChange}
				rows="3"
				className="form-control w-75"
			>
				Your review here ...
			</textarea>

			<button type="submit" className="btn-pill mt-10">Submit review</button>
			<button className="btn-pill-outline ms-2">Dismiss</button>
		</form>
	);
}