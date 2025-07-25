import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

import Calendar from "/src/components/Calendar/Calendar";
import { dayMonYear } from "/src/utils/dateUtils";

export default function AvailabilitySection() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [checkIn, setCheckIn] = useState(new Date());
	const [checkOut, setCheckOut] = useState(new Date());

	useEffect(() => {
		const checkInString = searchParams.get("check_in");
		const checkOutString = searchParams.get("check_out");
		if (checkInString) {
			setCheckIn(new Date(checkInString));
		} else {
			setCheckIn(null);
		}
		if (checkOutString) {
			setCheckOut(new Date(checkOutString));
		} else {
			setCheckOut(null);
		}
	}, [searchParams.get("check_in"), searchParams.get("check_out")]);

	return (
		<>
			<h2 className="section-heading">Availability</h2>
			<div className="mt-10">
				{
					checkIn !== null && checkOut !== null &&
					<p className="text-muted">{dayMonYear(checkIn)} — {dayMonYear(checkOut)}</p>
				}
				<Calendar />
			</div>
		</>
	);
}
