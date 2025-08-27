import { GeoAltFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import countries from "react-select-country-list";

import "./CurrentTrip.css";
import { checkInTimes, checkOutTimes, fileStorage } from "utils/constants";
import { weekdayMonYear } from "utils/dateUtils";

type CurrentTripProps = {
	item: any
};

export default function CurrentTrip({ item }: CurrentTripProps) {
	const googleMapsLink = `https://www.google.com/maps/place/${item.geo.x}N+${item.geo.y}E`;
	const checkIn = weekdayMonYear(new Date(item.check_in));
	const checkOut = weekdayMonYear(new Date(item.check_out));
	
	return (
		<div className="border-section w-100">
			<div className="d-flex justify-content-between">
				<div>
					<h2 className="nav-item-font">Current trip</h2>
					<div className="mt-10 section-heading">{item.title}</div>
					<div className="mt-6 d-flex align-items-center">
						<GeoAltFill size={18} />
						{item.city}, {item.street} {item.street_no}, {countries().getLabel(item.country)}
					</div>
					<div className="mt-6">
						<a href={googleMapsLink} target="_blank" className="heading btn-text-underline">Google Map directions</a>
					</div>

					<div className="d-flex section-container">
						<div>
							<div>Check-in</div>
							<div className="mt-6 property-card-heading">{checkIn}</div>
							<div className="mt-6 text-muted">{checkInTimes}</div>
						</div>
						<div className="mx-5 vr"></div>
						<div>
							<div>Check-out</div>
							<div className="mt-6 property-card-heading">{checkOut}</div>
							<div className="mt-6 text-muted">{checkOutTimes}</div>
						</div>
					</div>
					<Link to={`/booking?id=${item.booking_id}&pin=${item.pin_code}`}>
						<div className="mt-10 btn-pill">See booking confirmation</div>
					</Link>
				</div>
				<div>
					<img id="trip-card-photo" src={fileStorage + item.images_url_array[0]}/>
				</div>
			</div>
		</div>
	);
}