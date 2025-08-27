import { useEffect, useState } from "react";

import "./StayPageReviewItem.css";
import { getUserNameAndAvatar } from "api/BackendApiService";
import Rating from "components/common/Rating";
import Avatar from "components/user/Avatar";
import { yearDashMonthDashDay } from "utils/dateUtils";

type StayPageReviewItemProps = {
	reviewData: any,
	isCompact: boolean | undefined
};

export default function StayPageReviewItem({ reviewData, isCompact }: StayPageReviewItemProps) {
	const [user, setUser] = useState({
		img_url: null,
		first_name: "Deleted"
	});

	useEffect(() => {
		getUserNameAndAvatar(reviewData.user_id)
			.then(response => {
				if (response.data) {
					setUser(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	function renderDetailedReview() {
		return (
			<div className="mt-10 row">
				{
					user &&
					<div className="d-flex col-3">
						<Avatar url={user.img_url || undefined} size={40} firstName={user.first_name} previewAvatar={undefined} />
						<div className="ms-2">
							<div className="text-bold">{user.first_name}</div>
							<div className="text-muted">{yearDashMonthDashDay(new Date(reviewData.created_at))}</div>
						</div>
					</div>
				}
				<div className="col-8">
					<div className="title-text">{reviewData.title}</div>
					<div className="mt-10">{reviewData.body}</div>
				</div>
				<div className="col-1"><Rating score={reviewData.rating} reviewsNo={reviewData.reviews_no} /></div>
			</div>
		)
	}
	
	return (
		<>
		{
			isCompact &&
			<div className="mt-10 col border-section">
				{
					user &&
					<div className="d-flex">
						<Avatar url={user.img_url || undefined} size={40} firstName={user.first_name} previewAvatar={undefined} />
						<div className="ms-2">
							<div className="text-bold">{user.first_name}</div>
							<div className="text-muted">{yearDashMonthDashDay(new Date(reviewData.created_at))}</div>
						</div>
					</div>
				}
				<div className="mt-6">{reviewData.body}</div>
				<div className="mt-10 btn-text-underline" data-bs-toggle="modal" data-bs-target="#detailedReviewModal">Read more</div>
				<div
					id="detailedReviewModal"
					className="modal fade"
					tabIndex={-1}
					aria-labelledby="detailedReviewModalLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								{renderDetailedReview()}
							</div>
						</div>
					</div>
				</div>
			</div>
		}
		{
			!isCompact &&
			renderDetailedReview()
		}
		</>
	);
}