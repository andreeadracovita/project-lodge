import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import './ListItem.css';

function ListItem({ id, img_url, title, city, country, price, checkIn, checkOut }) {

	const isFavorite = true;

	const displayDate = checkIn.getDate() + " " + checkIn.toLocaleString('default', {month: 'long'}) +
		" - " + checkOut.getDate() + " " + checkOut.toLocaleString('default', {month: 'long'}); // 1 May - 2 May (Year if not current)

	// 2025-05-01 year-month-day
	function formatDate(date) {
		return date.getFullYear().toString() + "-" +
			(date.getMonth() + 1).toString().padStart(2, '0') + "-" +
			date.getDate().toString().padStart(2, '0');
	}
	
	const checkInParam = formatDate(checkIn);
	const checkOutParam = formatDate(checkOut);

	return (
		<div className="col-12 col-sm-6 col-md-3 gy-3">
			<Link
				to={{
					pathname: `/stay/${id}`,
					search: `?adults=1&children=1&check_in=${checkInParam}&check_out=${checkOutParam}`
				}}
			>
				<div className="position-relative">
					<img src={img_url} className="card-img mb-2" />
					<Icon.HeartFill size={24} color={isFavorite ? "#e3480a" : "#9d9794"} className="bi bi-heart-fill heart-icon position-absolute" />
					<div>
						<p className="mb-0">{title}</p>
						<p className="lato-bold">{city}, {country}</p>
						<p className="text-muted">{displayDate}</p>
						<p><span className="lato-bold">{price}</span> currency night</p>
						<p><Icon.StarFill color="black" size={16} /> <span className="lato-bold">4.95</span></p>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default ListItem;