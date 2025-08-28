import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { getCalendarBookingsForPropertyId } from "api/BackendApiService";
import HostingCalendarMonth from "components/hosting/HostingCalendarMonth";

function createBookedTag(dayElementId: number, tagText: string) {
	const dayElement = document.getElementById(`${dayElementId}`);
	if (dayElement) {
		const tag = document.createElement("div");
		// Differentiate between check-in, out, booked
		tag.id = `tag-${tagText}-${dayElementId}`;
		tag.className = "mt-6 booked-tag";

		const tagSpan = document.createElement("span");
		tagSpan.textContent = tagText;
		tag.appendChild(tagSpan);

		dayElement.appendChild(tag);
	}
}

function attachBookingTagsToDays(bookings: any[]) {
	for (let booking of bookings) {
		const checkIn = new Date(booking.check_in);
		const checkInId = checkIn.getFullYear() * 10000 + checkIn.getMonth() * 100 + checkIn.getDate();
		createBookedTag(checkInId, "Check-in");

		const checkOut = new Date(booking.check_out);
		const checkOutId = checkOut.getFullYear() * 10000 + checkOut.getMonth() * 100 + checkOut.getDate();
		createBookedTag(checkOutId, "Check-out");

		// For intermediary days create Booked
		const loopStart = checkIn;
		loopStart.setDate(loopStart.getDate() + 1);
		for (let d = loopStart; d < checkOut; d.setDate(d.getDate() + 1)) {
			const dayId = d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate();
			createBookedTag(dayId, "Booked");
		}
	}
}

/**
 * Retrieve all bookings for selectedPropId. --For each booking, attach new div to calendar day corresponding to state:--
 * - Check-in
 * - Booked
 * - Check-out
 */
export default function HostingCalendarView() {
	const [searchParams] = useSearchParams();
	const [selectedPropId, setSelectedPropId] = useState<number | undefined>();
	const [isFocused, setIsFocused] = useState(false);

	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth();
	const months = [];
	for (let year = currentYear - 1; year < currentYear + 2; year++) {
		for (let m = 0; m < 12; m++) {
			months.push(<HostingCalendarMonth id={year*100+m} key={year*100+m} month={m} year={year} />)
		}
	}

	useEffect(() => {
		setIsFocused(true);
		focusToday();
	}, [!isFocused && document.getElementById(`${currentYear*100+currentMonth}`)]);

	useEffect(() => {
		setSelectedPropId(searchParams.get("id") ? parseInt(searchParams.get("id") || "0") : undefined);
	}, [searchParams.get("id") && parseInt(searchParams.get("id") || "0") !== selectedPropId]);

	useEffect(() => {
		if (selectedPropId) {
			getCalendarBookingsForPropertyId(selectedPropId)
				.then(response => {
					// Clear previously attached divs by className
					const bookedElements = Array.from(document.getElementsByClassName("booked-tag"));
					if (bookedElements.length > 0) {
						bookedElements.forEach(element => {
							element.remove();
						});
					}

					attachBookingTagsToDays(response.data);
				})
				.catch(error => {
					console.error(error);
				});
		}
	}, [selectedPropId]);

	function focusToday() {
		const currentMonthElement = document.getElementById(`${currentYear * 100 + currentMonth}`);
		currentMonthElement?.scrollIntoView();
	}
	
	return (
		<>
			<div className="text-end">
				<span className="btn-pill-hover-only" onClick={focusToday}>Today</span>
			</div>

			<div id="calendar-sheet" className="mt-10">
				{months}
			</div>
		</>
	);
}