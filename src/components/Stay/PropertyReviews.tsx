import { useEffect, useState } from "react";

import { getAllFeatures, getAllExperiences, getAllReviewsByPropertyId } from "api/BackendApiService";
import Rating from "components/common/Rating";
import StayPageReviewItem from "components/review/StayPageReviewItem";

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
	}, []);
	
	return (
		<>
			<h2 id="reviews" className="section-heading">Guest reviews</h2>
			<div className="mt-10">
				<Rating score={property.rating} reviewsNo={property.reviews_no} />
			</div>
			<div className="mt-6 row row-cols-3">
			{
				reviews.slice(0, 3).map((review, i) => <StayPageReviewItem key={i} reviewData={review} isCompact={true} />)
			}
			</div>
			{
				reviews.length > 3 && <div className="btn-pill-outline mt-6">Show more</div>
			}
		</>
	);
}