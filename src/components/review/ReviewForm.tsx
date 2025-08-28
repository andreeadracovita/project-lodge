import { useState } from "react";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router-dom";

import StarRating from "./StarRating";
import { addReviewForBookingId } from "api/BackendApiService";
import FormError from "components/common/FormError";

type ReviewFormProps = {
	propertyId: number
};

export default function ReviewForm({ propertyId }: ReviewFormProps) {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [input, setInput] = useState({
		rating: 0,
		title: "",
		body: ""
	});
	const [errors, setErrors] = useState<string[]>([]);
	const bookingId = searchParams.get("booking_id");

	function handleChange(event: any): void {
		const { value, name } = event.target;

		setInput((prevValue: any) => {
			return {
				...prevValue,
				[name]: value
			}
		});
	}

	function handleSubmit(event: any): void {
		event.preventDefault();
		if (!bookingId) {
			return;
		}
		const payload = {
			rating: input.rating,
			title: input.title,
			body: input.body,
			property_id: propertyId
		};
		addReviewForBookingId(parseInt(bookingId), payload)
			.then(response => {
				const errors = response.data.errors;
				if (errors) {
					setErrors(errors);
					return;
				}
				navigate("/myaccount/reviews");
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
			<input
				id="title"
				type="text"
				name="title"
				value={input.title}
				onChange={handleChange}
				className="form-control w-75"
				maxLength={80}
			/>

			<label htmlFor="body" className="mt-10">Tell us more about your stay</label>
			<textarea
				id="body"
				name="body"
				value={input.body}
				onChange={handleChange}
				rows={3}
				className="form-control w-75"
			>
				Your review here ...
			</textarea>
			<FormError errors={errors} />

			<div className="d-flex mt-4">
				<button type="submit" className="btn-pill">Submit review</button>
				<div className="btn-pill-outline ms-2" onClick={() => navigate(-1)}>Dismiss</div>
			</div>
		</form>
	);
}