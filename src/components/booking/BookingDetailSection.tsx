import { useSearchParams } from "react-router";

import BookedPropertyType from "components/booking/BookedPropertyType";
import { checkInTimes, checkOutTimes } from "utils/constants";
import { weekdayMonYear, getNightsCount } from "utils/dateUtils";

type BookingDetailSectionProps = {
	item: any
};

export default function BookingDetailSection({ item }: BookingDetailSectionProps) {
	const [searchParams] = useSearchParams();
	const checkInParam = searchParams.get("check_in");
	const checkOutParam = searchParams.get("check_out");
	const checkInDate = checkInParam ? new Date(checkInParam) : undefined;
	const checkOutDate = checkOutParam ? new Date(checkOutParam) : undefined;
	const nightsCount: number = checkInParam && checkOutParam ? getNightsCount(checkInDate, checkOutDate) : 0;
	const guestsNo: number = parseInt(searchParams.get("guests") || "0");
	
	return (
		<div className="border-section">
			<h2 className="property-card-heading">Your booking details</h2>
			<div className="mt-10 d-flex justify-content-between">
				<div>
					<div>Check-in</div>
					<div className="text-bold property-card-heading">{checkInDate ? weekdayMonYear(checkInDate) : ""}</div>
					<div className="text-muted">{checkInTimes}</div>
				</div>
				<div className="vr"></div>
				<div>
					<div>Check-out</div>
					<div className="text-bold property-card-heading">{checkOutDate ? weekdayMonYear(checkOutDate) : ""}</div>
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