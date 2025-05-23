import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

import { yearDashMonthDashDay } from "/src/utils/DateFormatUtils";
import Rating from "./Rating";
import "./ListItem.css";

function ListItem({ isLink, id, img_url, title, city, country, price, currency, rating, checkIn, checkOut }) {

	const isFavorite = true;

	let displayDate = "";
	let checkInParam = "";
	let checkOutParam = "";
	if (checkIn && checkOut) {
		displayDate = checkIn.getDate() + " " + checkIn.toLocaleString('default', {month: 'long'}) +
		" - " + checkOut.getDate() + " " + checkOut.toLocaleString('default', {month: 'long'}); // 1 May - 2 May (Year if not current)
		checkInParam = yearDashMonthDashDay(checkIn);
		checkOutParam = yearDashMonthDashDay(checkOut);
	}

	return (
		<div className="mb-3">
			<Link
				to={isLink ? {
					pathname: `/stay`,
					search: `?id=${id}&guests=2&check_in=${checkInParam}&check_out=${checkOutParam}`
				} : {}}
			>
				<div className="position-relative">
					<img src={img_url} className="card-img mb-2" />
					<Icon.HeartFill size={24} color={isFavorite ? "#ff3131" : "#9d9794"} className="bi bi-heart-fill heart-icon position-absolute" />
					<div>
						<p className="mb-0">{title}</p>
						<p className="lato-bold">{city}, {country}</p>
						<p className="text-muted">{displayDate}</p>
						<p><span className="lato-bold">{price}</span> {currency} night</p>
						<Rating score={rating} />
					</div>
				</div>
			</Link>
		</div>
	);
}

export default ListItem;