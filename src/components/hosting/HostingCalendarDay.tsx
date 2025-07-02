import classNames from "classnames";
import { useEffect } from "react";

import "./HostingCalendarDay.css";

export default function HostingCalendarDay({ id, year, month, day }) {

	function isPastDate(dayIndex) {
		// TODO: current day should not be past
		const date = new Date(year, month, dayIndex);
		if (date < new Date()) {
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