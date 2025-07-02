import classNames from "classnames";
import { useEffect } from "react";

import "./HostingCalendarDay.css";
import { compareDates } from "/src/utils/DateFormatUtils";

export default function HostingCalendarDay({ id, year, month, day }) {

	function isPastDate(dayIndex) {
		const date = new Date(year, month, dayIndex);
		if (compareDates(date, new Date()) < 0) {
			return true;
		}
		return false;
	}

	const containerClass = classNames(
		"hosting-calendar-day",
		"d-flex",
		"flex-wrap",
		"justify-content-start",
		"p-1",
		{
			"past": isPastDate(day)
		}
	);
	
	return (
		<div
			id={id}
			className={containerClass}
		>
			<div className="w-100 d-flex justify-content-between">
				<span>{day}</span>
			</div>
		</div>
	);
}