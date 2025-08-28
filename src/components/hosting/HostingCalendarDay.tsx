import classNames from "classnames";

import "./HostingCalendarDay.css";
import { compareDates } from "utils/dateUtils";

type HostingCalendarDayProps = {
	id: number,
	year: number,
	month: number,
	day: number
};

export default function HostingCalendarDay({ id, year, month, day }: HostingCalendarDayProps) {

	function isPastDate(dayIndex: number) {
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
			id={String(id)}
			className={containerClass}
		>
			<div className="w-100 d-flex justify-content-between">
				<span>{day}</span>
			</div>
		</div>
	);
}