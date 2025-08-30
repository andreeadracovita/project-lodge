import classNames from "classnames";

import { compareDates } from "utils/dateUtils";

type CalendarDayProps = {
	year: number,
	month: number,
	day: number,
	checkIn?: Date,
	checkOut?: Date,
	bookedDates: any[],
	handleDateClicked: any
};

export default function CalendarDay({ year, month, day, checkIn, checkOut, bookedDates, handleDateClicked }: CalendarDayProps) {
	const date = new Date(year, month, day);
	const isAvailable = isDateAvailable(date);
	const isCheckIn = isCheckInDay(day);
	const isCheckOut = isCheckOutDay(day);

	// Selection styling
	function isCheckInDay(dayIndex: number): boolean {
		if (checkIn) {
			return checkIn.getFullYear() === year && checkIn.getMonth() === month && checkIn.getDate() === dayIndex;
		}
		return false;
	}

	function isCheckOutDay(dayIndex: number): boolean {
		if (checkOut) {
			return checkOut.getFullYear() === year && checkOut.getMonth() === month && checkOut.getDate() === dayIndex;
		}
		return false;
	}

	function isIntermediaryDay(dayIndex: number): boolean {
		let queryDate = new Date(year, month, dayIndex);
		if (checkIn && checkOut) {
			if (queryDate > checkIn && queryDate < checkOut) {
				return true;
			}
		}
		return false;
	}

	function isDateAvailable(date: Date): boolean {
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

	function sanitizeDateClick(isAvailable: boolean, date: Date): void {
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