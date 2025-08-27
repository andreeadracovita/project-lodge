import { useEffect, useState } from "react";
import { ThreeDots } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import { deleteReviewById, getPropertyById } from "api/BackendApiService";
import PropertyAvatar from "components/common/PropertyAvatar";
import Rating from "components/common/Rating";
import { yearDashMonthDashDay } from "utils/dateUtils";

type UserPageReviewItemProps = {
	reviewData: any,
	setNeedsRefresh: any
};

export default function UserPageReviewItem({ reviewData, setNeedsRefresh }: UserPageReviewItemProps) {
	const [property, setProperty] = useState<any>();

	useEffect(() => {
		getPropertyById(reviewData.property_id)
			.then(response => {
				if (response.data) {
					setProperty(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	function deleteReview(): void {
		deleteReviewById(reviewData.id)
			.then(response => {
				if (response.status === 200) {
					setNeedsRefresh(true);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}
	
	return (
		<>
		{
			property &&
			<div className="mt-10 border-section d-flex">
				<div className="col-10 d-flex">
					<Link to={`/stay?id=${reviewData.property_id}`}>
						<PropertyAvatar url={property.images_url_array[0]} size={72} />
					</Link>
					<div className="ms-5">
						<div>{property.title}</div>
						<h2 className="title-text">{reviewData.title}</h2>
						<div className="d-flex align-items-center">
							<Rating score={reviewData.rating} reviewsNo={undefined} />
							<div className="ms-2">Reviewed on: {yearDashMonthDashDay(new Date(reviewData.created_at))}</div>
						</div>
						<div className="mt-6">{reviewData.body}</div>
					</div>
				</div>
				<div className="col-2 d-flex justify-content-end">
					<div className="dropdown">
						<div id="dropdown-button" role="button" className="btn-more d-flex align-items-center justify-content-center" data-bs-toggle="dropdown">
							<ThreeDots />
						</div>
						
						<ul className="dropdown-menu dropdown-menu-end text-small">
							<li><div className="dropdown-item cursor-pointer" data-bs-toggle="modal" data-bs-target="#confirmModal">Delete</div></li>
						</ul>
					</div>
				</div>

				<div className="modal fade" id="confirmModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								Are you sure you want to delete the review?
							</div>
							<div className="modal-footer">
								<div className="btn-pill" onClick={deleteReview} data-bs-dismiss="modal">Delete</div>
								<div className="btn-pill-outline" data-bs-dismiss="modal">Back</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		}
		</>
	);
}