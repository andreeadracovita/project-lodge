import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { getAuthorizationForReview, getPropertyById } from "/src/api/BackendApiService";
import ReviewForm from "/src/components/review/ReviewForm";
import PropertyListItem from "/src/components/list/PropertyListItem";

export default function Review() {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const bookingId = searchParams.get("booking_id");
	const [isAuthorizedToReview, setIsAuthorizedToReview] = useState(true);
	const [property, setProperty] = useState();

	useEffect(() => {
		if (!bookingId) {
			navigate("/");
			return;
		}
		getAuthorizationForReview(bookingId)
			.then(responseAuth => {
				const data = responseAuth.data;
				if (data && data.isAuthorized) {
					// Is authorized: load page content
					const propertyId = data.property_id;
					getPropertyById(propertyId)
						.then(response => {
							if (response.data?.length > 0) {
								setProperty(response.data[0]);
							}
						})
						.catch(error => {
							console.error(error);
						});
				}
			})
			.catch(error => {
				navigate("/");
				console.error(error);
			})
	}, []);
	
	return (
		<div className="container section-container">
		{
			property &&
			<div className="row">
				<div className="col-3">
					<PropertyListItem
						isPreview={true}
						item={property}
						hideWishlist={true}
						hidePrice={true}
					/>
				</div>
				<div className="col-9">
					<h1 className="page-heading">Review your stay</h1>
					<ReviewForm />
				</div>
			</div>
		}
		</div>
	);
}