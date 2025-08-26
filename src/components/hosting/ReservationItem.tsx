import { Link } from "react-router-dom";

import { weekdayMonYear } from "utils/dateUtils";

export default function ReservationItem({ item }) {
	
	return (
		<Link to={`/booking?id=${item.id}&pin=${item.pin_code}`}>
			<div className="border-section mt-6">
				<div className="text-bold">{item.title}</div>
				<div className="mt-10">Main guest: <span className="text-bold">{item.first_name} {item.last_name}</span></div>
				<div>Number of guests: <span className="text-bold">{item.guests}</span></div>
				<div>Check-in: <span className="text-bold">{weekdayMonYear(new Date(item.check_in))}</span></div>
				<div>Check-out: <span className="text-bold">{weekdayMonYear(new Date(item.check_out))}</span></div>
			</div>
		</Link>
	);
}