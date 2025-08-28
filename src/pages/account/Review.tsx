import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { getAuthorizationForReview, getPropertyById } from "api/BackendApiService";
import ReviewForm from "components/review/ReviewForm";
import PropertyListItem from "components/list/PropertyListItem";

export default function Review() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const bookingId = searchParams.get("booking_id");
	const [property, setProperty] = useState<any>();

	useEffect(() => {
		if (!bookingId) {
			navigate("/");
			return;
		}

		getAuthorizationForReview(parseInt(bookingId))
			.then(responseAuth => {
				const data = responseAuth.data;
				if (data && data.isAuthorized) {
					const propertyId = data.property_id;
					getPropertyById(propertyId)
						.then(response => {
							if (response.data) {
								setProperty(response.data);
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
			});
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
						checkIn={""}
						checkOut={""}
						guests={1}
						nightsCount={1}
						isCompact={true}
						hideWishlist={false}
					/>
				</div>
				<div className="col-9">
					<h1 className="page-heading">Review your stay</h1>
					<ReviewForm propertyId={property.id} />
				</div>
			</div>
		}
		</div>
	);
}