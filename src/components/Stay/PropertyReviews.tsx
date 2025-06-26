import { useEffect, useState } from "react";

import { getAllFeatures, getAllExperiences, getAllReviewsByPropertyId } from "/src/api/BackendApiService";
import Rating from "/src/components/common/Rating";
import ReviewItem from "/src/components/review/ReviewItem";

export default function PropertyReviews({ property }) {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		getAllReviewsByPropertyId(property.id)
			.then(response => {
				setReviews(response.data);
			})
			.catch(error => {
				console.error(error);
			});
	})
	
	return (
		<>
			<h2 className="section-heading">Guest reviews</h2>
			<Rating score={property.rating} reviewsNo={property.reviews_no} />
			<div className="mt-10 text-strong">Guests who stayed here loved</div>
			<div className="row row-cols-3">
			{
				reviews.slice(0, 3).map((review, i) => <ReviewItem item={review} showUserAvatar={true} />)
			}
			</div>
			{
				reviews.length > 3 && <div className="btn-pill-outline mt-6">Show more</div>
			}
		</>
	);
}