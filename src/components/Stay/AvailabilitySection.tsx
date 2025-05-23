import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

import Calendar from "/src/components/Calendar/Calendar";
import { dayMonYear } from "/src/utils/DateFormatUtils";

function AvailabilitySection() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [checkIn, setCheckIn] = useState(new Date());
	const [checkOut, setCheckOut] = useState(new Date());

	useEffect(() => {
		const checkInString = searchParams.get("check_in");
		const checkOutString = searchParams.get("check_out");
		if (checkInString) {
			setCheckIn(new Date(checkInString));
		}
		if (checkOutString) {
			setCheckOut(new Date(checkOutString));
		}
	}, [searchParams.get("check_in"), searchParams.get("check_out")]);

	return (
		<>
			<h2>Availability</h2>
			<p className="text-muted">{dayMonYear(checkIn)} — {dayMonYear(checkOut)}</p>
			<Calendar />
		</>
	);
}

export default AvailabilitySection;