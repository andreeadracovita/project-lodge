import { dayMonYear } from "/src/utils/DateFormatUtils";

export default function DayTag({ date }) {
	
	return (
		<div className="d-flex justify-content-center">
			<div className="tag-pill">{dayMonYear(date)}</div>
		</div>
	);
}