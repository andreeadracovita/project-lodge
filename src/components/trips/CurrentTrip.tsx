import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import countries from "react-select-country-list";

import "./CurrentTrip.css";
import { checkInTimes, checkOutTimes, fileStorage } from "/src/utils/constants";
import { weekdayMonYear } from "/src/utils/DateFormatUtils";

export default function CurrentTrip({ item }) {
	console.log(item);
	const checkIn = weekdayMonYear(new Date(item.check_in));
	const checkOut = weekdayMonYear(new Date(item.check_out));
	
	return (
		<Link to={`/booking?id=${item.booking_id}&pin=${item.pin_code}`}>
			<div className="border-section w-100">
				<div className="d-flex justify-content-between">
					<div>
						<h2 className="nav-item-font">Current trip</h2>
						<div className="mt-10 section-heading">{item.title}</div>
						<div className="mt-6 d-flex align-items-center">
							<Icon.GeoAltFill size={18} />
							{item.city}, {item.street ?? "street"} 
							{item.street_no ?? "number"}, {countries().getLabel(item.country)}
						</div>
						<div className="mt-6">GPS: Lon, Lat</div>

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
					</div>
					<div>
						<img id="trip-card-photo" src={fileStorage + item.images_url_array[0]}/>
					</div>
				</div>
			</div>
		</Link>
	);
}