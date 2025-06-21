import classNames from "classnames";

import "./HostingCalendarDay.css";

export default function HostingCalendarDay({ id, year, month, day }) {
	const date = new Date(year, month, day);

	function isPastDate(dayIndex) {
		// TODO: current day should not be past
		const date = new Date(year, month, dayIndex);
		if (date < new Date()) {
			return true;
		}
		return false;
	}

	const containerClass = classNames(
		"calendar-day",
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
			onClick={() => {}}
		>
			<div className="w-100 d-flex justify-content-between">
				<span>{day}</span>
				<span>80 CHF</span>
			</div>
		</div>
	);
}