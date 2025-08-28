import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import countries from "react-select-country-list";

import { existsReviewForBookingId } from "api/BackendApiService";
import { fileStorage } from "utils/constants";
import { dayMonYear } from "utils/dateUtils";

type BookingListItemProp = {
	item: any
};

export default function BookingListItem({item}: BookingListItemProp) {
	const [showReviewButton, setShowReviewButton] = useState(false);
	const bookingPath = `/booking?id=${item.booking_id}&pin=${item.pin_code}`;

	useEffect(() => {
		// Can review only non-cancelled bookings
		if (item.booking_status !== "confirmed") {
			return;
		}

		// Can review only completed bookings
		if (new Date(item.check_out) >= new Date()) {
			return;
		}

		existsReviewForBookingId(item.booking_id)
			.then(response => {
				if (response.data?.exists === false) {
					setShowReviewButton(true);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);
	
	return (
		<div>
			<div className="card-item w-100 row">
				<div className="col-4">
					<Link to={bookingPath}>
						<img src={fileStorage + item.images_url_array[0]} className="list-item-photo" />
					</Link>
				</div>
				<div className="col-8">
					<Link to={bookingPath}>
						<span className="d-block text-bold">{item.title}</span>
						<span className="d-block">{item.city}, {countries().getLabel(item.country)}</span>
						<span className="d-block text-muted">{dayMonYear(new Date(item.check_in))} — {dayMonYear(new Date(item.check_out))}</span>
					</Link>
					<span className="d-block mt-6">
					{
						showReviewButton &&
						<Link to={`/review?booking_id=${item.booking_id}`} className="btn-pill">Review</Link>
					}
					</span>
				</div>
			</div>
		</div>
	);
}