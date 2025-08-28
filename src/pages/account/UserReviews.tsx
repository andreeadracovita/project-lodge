import { useEffect, useState } from "react";

import { getAllReviewsByLoggedUser } from "api/BackendApiService";
import UserPageReviewItem from "components/review/UserPageReviewItem";

export default function UserReviews() {
	const [reviews, setReviews] = useState([]);
	const [needsRefresh, setNeedsRefresh] = useState(false);

	useEffect(() => {
		getAllReviewsByLoggedUser()
			.then(response => {
				setReviews(response.data);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		if (needsRefresh) {
			setNeedsRefresh(false);
			getAllReviewsByLoggedUser()
				.then(response => {
					console.log("refresh reviews");
					setReviews(response.data);
				})
				.catch(error => {
					console.error(error);
				});
		}
	}, [needsRefresh]);
	
	return (
		<div className="container section-container">
			<h1 className="page-heading">Reviews</h1>
			<div>
			{
				reviews.map((review: any, i: number) => <UserPageReviewItem key={i} reviewData={review} setNeedsRefresh={setNeedsRefresh} />)
			}
			</div>
		</div>
	);
}