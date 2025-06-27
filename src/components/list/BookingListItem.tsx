import { Link } from "react-router-dom";

import { fileStorage } from "/src/utils/constants";
import { dayMonYear } from "/src/utils/DateFormatUtils";

type BookingListItemProp = {
	id: number,
	img: string,
	title: string,
	city: string,
	country: string,
	check_in: string,
	check_out: string,
	pin_code: string
};

export default function BookingListItem({item}: BookingListItemProp) {
	const bookingPath = `/booking?id=${item.booking_id}&pin=${item.pin_code}`;

	function renderReviewButton() {
		// Can review only non-cancelled bookings
		if (item.booking_status_id !== 2) {
			return;
		}

		// Can review only completed bookings
		if (new Date(item.check_out) >= new Date()) {
			return;
		}

		return <Link to={`/review?booking_id=${item.booking_id}`} className="btn-pill">Review</Link>;
	}
	
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
						<span className="d-block lato-bold">{item.title}</span>
						<span className="d-block">{item.city}, {item.country}</span>
						<span className="d-block text-muted">{dayMonYear(new Date(item.check_in))} — {dayMonYear(new Date(item.check_out))}</span>
					</Link>
					<span className="d-block mt-6">{renderReviewButton()}</span>
				</div>
			</div>
		</div>
	);
}