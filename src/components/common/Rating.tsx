import "./Rating.css";

export default function Rating({score, reviewsNo}) {

	return (
		<span className="d-flex align-items-center">
			<div className="rating-container d-flex justify-content-center align-items-center">
				<span>{score ? score.toFixed(1) : "-"}</span>
			</div>
			{
				reviewsNo !== null && parseInt(reviewsNo) > 0 &&
				<span className="ms-2 text-muted"> · {reviewsNo} {reviewsNo > 1 ? "reviews" : "review"}</span>
			}
		</span>
	);
}
