import { useEffect, useState } from "react";

import { getAllReviewsByLoggedUser } from "/src/api/BackendApiService";
import ReviewItem from "/src/components/review/ReviewItem";

export default function UserReviews() {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		getAllReviewsByLoggedUser()
			.then(response => {
				setReviews(response.data);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);
	
	return (
		<div className="container section-container">
			<h1 className="page-heading">Your reviews</h1>
			<div className="row row-cols-3">
			{
				reviews.map((review, i) => <ReviewItem key={i} item={review} showPropertyAvatar={true} />)
			}
			</div>
		</div>
	);
}