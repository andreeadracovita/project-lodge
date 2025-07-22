import { useEffect, useState } from "react";

import { getPropertyById, getUserNameAndAvatar } from "/src/api/BackendApiService";
import PropertyAvatar from "/src/components/common/PropertyAvatar";
import Rating from "/src/components/common/Rating";
import Avatar from "/src/components/user/Avatar";
import { yearDashMonthDashDay } from "/src/utils/DateFormatUtils";

export default function StayPageReviewItem({ reviewData, isCompact }) {
	const [user, setUser] = useState();

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
	
	return (
		<>
		{
			isCompact &&
			<div className="mt-10 col border-section">
				{
					user &&
					<div className="d-flex">
						<Avatar url={user.img_url} size={40} firstName={user.first_name} />
						<div className="ms-2">
							<div className="text-bold">{user.first_name}</div>
							<div className="text-muted">{yearDashMonthDashDay(new Date(reviewData.created_at))}</div>
						</div>
					</div>
				}
				<div className="mt-6">{reviewData.body}</div>
				<div className="mt-10 btn-text-underline">Read more [Opens modal]</div>
			</div>
		}
		{
			!isCompact &&
			<div className="mt-10 row">
				{
					user &&
					<div className="d-flex col-3">
						<Avatar url={user.img_url} size={40} firstName={user.first_name} />
						<div className="ms-2">
							<div className="text-bold">{user.first_name}</div>
							<div className="text-muted">{yearDashMonthDashDay(new Date(reviewData.created_at))}</div>
						</div>
					</div>
				}
				<div className="col-8">
					<div className="">{reviewData.title}</div>
					<div>{reviewData.body}</div>
				</div>
				<div className="col-1"><Rating score={reviewData.rating} reviewsNo={reviewData.reviews_no} /></div>
			</div>
		}
		</>
	);
}