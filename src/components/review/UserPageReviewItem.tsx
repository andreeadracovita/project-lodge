import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import { getPropertyById } from "/src/api/BackendApiService";
import PropertyAvatar from "/src/components/common/PropertyAvatar";
import Rating from "/src/components/common/Rating";
import { yearDashMonthDashDay } from "/src/utils/DateFormatUtils";

export default function UserPageReviewItem({ reviewData }) {
	const [property, setProperty] = useState();

	useEffect(() => {
		getPropertyById(reviewData.property_id)
			.then(response => {
				if (response.data.length === 1) {
					setProperty(response.data[0]);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);
	
	return (
		<>
		{
			property &&
			<div className="mt-10 border-section d-flex">
				<div className="col-10 d-flex">
					<PropertyAvatar url={property.images_url_array[0]} size={72} />

					<div className="ms-5">
						<div>{property.title}</div>
						<h2 className="section-heading">{reviewData.title}</h2>
						<div className="d-flex align-items-center">
							<Rating score={reviewData.rating} />
							<div className="ms-2">Reviewed on: {yearDashMonthDashDay(new Date(reviewData.created_at))}</div>
						</div>
						<div className="mt-6">{reviewData.body}</div>
					</div>
				</div>
				<div className="col-2 d-flex justify-content-end">
					<div className="dropdown">
						<div id="dropdown-button" role="button" className="btn-more d-flex align-items-center justify-content-center" data-bs-toggle="dropdown">
							<Icon.ThreeDots />
						</div>
						
						<ul className="dropdown-menu dropdown-menu-end text-small">
							<li><Link to="#" className="dropdown-item">Edit</Link></li>
							<li><hr className="dropdown-divider" /></li>
							<li><Link to="#" className="dropdown-item">Delete</Link></li>
						</ul>
					</div>
				</div>
			</div>
		}
		</>
	);
}