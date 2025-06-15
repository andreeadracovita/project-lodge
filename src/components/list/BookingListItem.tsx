import { Link } from "react-router-dom";

import { fileStorage } from "/src/utils/constants";
import { dayMonYear } from "/src/utils/DateFormatUtils";

type BookingListItemProp = {
	id: number,
	img: string,
	title: string,
	city: string,
	country: string,
	check_in: string,
	check_out: string,
	pin_code: string
};

export default function BookingListItem({item}: BookingListItemProp) {
	
	return (
		<div>
			<Link to={`/booking?id=${item.booking_id}&pin=${item.pin_code}`}>
				<div className="border-section w-100 row">
					<div className="col-4">
						<img src={fileStorage + item.images_url_array[0]} className="list-item-photo" />
					</div>
					<div className="col-8">
						<span className="d-block lato-bold">{item.title}</span>
						<span className="d-block">{item.city}, {item.country}</span>
						<span className="d-block text-muted">{dayMonYear(new Date(item.check_in))} — {dayMonYear(new Date(item.check_out))}</span>
						<span className="d-block">Status: {item.booking_status_id} as string</span>
					</div>
				</div>
			</Link>
		</div>
	);
}