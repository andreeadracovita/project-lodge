import "./Rating.css";

type RatingProps = {
	score?: number,
	reviewsNo?: number
};

export default function Rating({ score, reviewsNo }: RatingProps) {

	return (
		<span className="d-flex align-items-center">
			<div className="rating-container d-flex justify-content-center align-items-center">
				<span>{score ? score.toFixed(1) : "-"}</span>
			</div>
			{
				(reviewsNo && reviewsNo > 0) &&
				<span className="ms-2 text-muted"> · {reviewsNo} { reviewsNo ? (reviewsNo > 1 ? "reviews" : "review") : ""}</span>
			}
		</span>
	);
}
