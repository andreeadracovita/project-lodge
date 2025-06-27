import { useEffect, useState } from "react";

import { getAllReviewsByLoggedUser } from "/src/api/BackendApiService";
import UserPageReviewItem from "/src/components/review/UserPageReviewItem";

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
			<h1 className="page-heading">Reviews</h1>
			<div>
			{
				reviews.map((review, i) => <UserPageReviewItem key={i} reviewData={review} />)
			}
			</div>
		</div>
	);
}