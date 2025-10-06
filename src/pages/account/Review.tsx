import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { getAuthorizationForReview, getBookingById, getPropertyById } from "api/BackendApiService";
import ReviewForm from "components/review/ReviewForm";
import PropertyListItem from "components/list/PropertyListItem";
import { getNightsCount } from "utils/dateUtils";

export default function Review() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const bookingId = searchParams.get("booking_id");
	const pin = searchParams.get("pin");
	const [property, setProperty] = useState<any>();
	const [bookingDetails, setBookingDetails] = useState<any>();
	const [nightsCount, setNightsCount] = useState<number>(1);

	useEffect(() => {
		if (!bookingId || !pin) {
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
					getBookingById(parseInt(bookingId), pin)
						.then(response => {
							const data = response.data;
							if (data) {
								setBookingDetails(data);
								setNightsCount(getNightsCount(new Date(data.check_in), new Date(data.check_out)));
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
			(property && bookingDetails) &&
			<div className="row">
				<div className="d-none d-md-block col-md-3">
					<PropertyListItem
						isPreview={true}
						item={{
							...property,
							price_night_site: bookingDetails.amount
						}}
						checkIn={""}
						checkOut={""}
						guests={bookingDetails.guests}
						nightsCount={nightsCount}
						isCompact={true}
						hideWishlist={true}
					/>
				</div>
				<div className="col-12 col-md-9">
					<h1 className="page-heading">Review your stay</h1>
					<ReviewForm propertyId={property.id} />
				</div>
			</div>
		}
		</div>
	);
}