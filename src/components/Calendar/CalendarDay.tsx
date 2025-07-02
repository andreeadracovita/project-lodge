import classNames from "classnames";

import { compareDates } from "/src/utils/DateFormatUtils";

export default function CalendarDay({ year, month, day, checkIn, checkOut, bookedDates, handleDateClicked }) {
	const date = new Date(year, month, day);
	const isAvailable = isDateAvailable(date);
	const isCheckIn = isCheckInDay(day);
	const isCheckOut = isCheckOutDay(day);

	// Selection styling
	function isCheckInDay(dayIndex) {
		if (checkIn) {
			return checkIn.getFullYear() === year && checkIn.getMonth() === month && checkIn.getDate() === dayIndex;
		}
		return false;
	}

	function isCheckOutDay(dayIndex) {
		if (checkOut) {
			return checkOut.getFullYear() === year && checkOut.getMonth() === month && checkOut.getDate() === dayIndex;
		}
		return false;
	}

	function isIntermediaryDay(dayIndex) {
		let queryDate = new Date(year, month, dayIndex);
		if (checkIn && checkOut) {
			if (queryDate > checkIn && queryDate < checkOut) {
				return true;
			}
		}
		return false;
	}

	function isDateAvailable(date) {
		if (compareDates(date, new Date()) < 0) {
			return false;
		}
		for (const booked of bookedDates) {
			if (date >= booked.check_in && date < booked.check_out) {
				return false;
			}
		}
		return true;
	}

	function sanitizeDateClick(isAvailable, date) {
		if (!isAvailable) {
			return;
		}
		handleDateClicked(date);
	}

	const containerClass = classNames(
		"calendar-day",
		{
			"highlight": isIntermediaryDay(day),
			"start-highlight": isCheckIn,
			"end-highlight": isCheckOut,
			"unavailable": !isAvailable,
			"cursor-pointer": isAvailable
		}
	);
	const dayClass = classNames(
		"text-center",
		{
			"start-end-checked": isCheckIn || isCheckOut,
			"day-selection-highlight": isAvailable && !isCheckIn && !isCheckOut
		}
	);

	return (
		<div
			className={containerClass}
			onClick={() => sanitizeDateClick(isAvailable, date)}
		>
			<span className={dayClass}>{day}</span>
		</div>
	);
}