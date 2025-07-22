import { useSearchParams } from "react-router";

import BookedPropertyType from "/src/components/booking/BookedPropertyType";
import { checkInTimes, checkOutTimes } from "/src/utils/constants";
import { weekdayMonYear, getNightsCount } from "/src/utils/DateFormatUtils";

export default function BookingDetailSection({ item }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const checkInDate = new Date(searchParams.get("check_in"));
	const checkOutDate = new Date(searchParams.get("check_out"));
	const nightsCount = getNightsCount(checkInDate, checkOutDate);
	const guestsNo = searchParams.get("guests");
	
	return (
		<div className="border-section">
			<h2 className="property-card-heading">Your booking details</h2>
			<div className="mt-10 d-flex justify-content-between">
				<div>
					<div>Check-in</div>
					<div className="text-bold property-card-heading">{weekdayMonYear(checkInDate)}</div>
					<div className="text-muted">{checkInTimes}</div>
				</div>
				<div className="vr"></div>
				<div>
					<div>Check-out</div>
					<div className="text-bold property-card-heading">{weekdayMonYear(checkOutDate)}</div>
					<div className="text-muted">{checkOutTimes}</div>
				</div>
			</div>
			<div className="mt-6">Total length of stay:</div>
			<div className="text-bold property-card-heading">{nightsCount} {nightsCount > 1 ? <span>nights</span> : <span>night</span>}</div>
			<hr />
			<div>You selected</div>
			<div className="text-bold"><BookedPropertyType rentalTypeId={item.rental_type_id} buildingTypeId={item.building_type_id} /> for {guestsNo} {guestsNo > 1 ? <span>guests</span> : <span>guest</span>}</div>
		</div>
	);
}