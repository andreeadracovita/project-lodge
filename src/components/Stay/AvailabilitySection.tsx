import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

import Calendar from "/src/components/Calendar/Calendar";

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

	const option = {
		month: "short",
		day: "numeric",
		year: "numeric"
	}

	return (
		<>
			<p className="section-heading">Availability</p>
			<p className="text-muted">{checkIn.toLocaleString("en-GB", option)} - {checkOut.toLocaleString("en-GB", option)}</p>
			<Calendar />
		</>
	);
}

export default AvailabilitySection;