import * as Icon from "react-bootstrap-icons";

import "./Rating.css";

export default function Rating({score, reviewsNo}) {
	return (
		<span className="d-flex align-items-center">
			<div className="rating-container d-flex justify-content-center align-items-center">
				<span>{score ? score.toFixed(2) : "4.5"}</span>
			</div>
			<span className="ms-2 text-muted"> · {reviewsNo} reviews</span>
		</span>
	);
}
