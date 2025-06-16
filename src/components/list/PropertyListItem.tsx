import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./PropertyListItem.css";
import WishlistIcon from "./WishlistIcon";
import { useAuth } from "/src/components/security/AuthContext";
import { yearDashMonthDashDay } from "/src/utils/DateFormatUtils";
import Rating from "/src/components/common/Rating";
import { fileStorage } from "/src/utils/constants";
import { getNightsCount } from "/src/utils/DateFormatUtils";
import { convertToPreferredCurrency } from "/src/utils/conversionUtils";

type Geo = {
	x: number,
	y: number
};

export type PropertyItem = {
	id: string,
	title: string,
	city: string,
	country: string,
	geo: Geo,
	price: string,
	rating?: number,
	images_url_array: Array[]
};

type PropertyListItemProps = {
	isLink: boolean;
	item: PropertyItem;
	checkIn: Date;
	checkOut: Date;
};

export default function PropertyListItem({ isLink, item, checkIn, checkOut }: PropertyListItemProps) {
	const authContext = useAuth();
	// const [convertedTotalPrice, setConvertedTotalPrice] = useState(0);

	let displayDate = "";
	let checkInParam = "";
	let checkOutParam = "";
	let nightsCount = 1;
	if (checkIn && checkOut) {
		// 1 May - 2 May (Year if not current)
		displayDate = checkIn.getDate() + " " + checkIn.toLocaleString('default', {month: 'long'}) +
		" - " + checkOut.getDate() + " " + checkOut.toLocaleString('default', {month: 'long'});
		checkInParam = yearDashMonthDashDay(checkIn);
		checkOutParam = yearDashMonthDashDay(checkOut);
		nightsCount = getNightsCount(checkIn, checkOut);
	}

	const linkPath = isLink
		? {
			pathname: `/stay`,
			search: `?id=${item.id}&guests=1&check_in=${checkInParam}&check_out=${checkOutParam}`
		}
		: {};

	const imgUrl = item.images_url_array.length > 0 ? fileStorage + item.images_url_array[0] : null;
	
	const siteTotalPrice = item.price * nightsCount;
	const convertedTotalPrice = convertToPreferredCurrency(siteTotalPrice, authContext.exchangeRate);

	return (
		<div className="mb-3">
			<div className="position-relative border-section">
				<Link to={linkPath}><img src={imgUrl} className="list-item-photo mb-2" /></Link>
				<WishlistIcon itemId={item.id} />
				<Link to={linkPath}>
					<div className="property-card-details">
						<p className="mb-0 property-card-heading">{item.title}</p>
						<div className="d-flex">
							<Rating score={item.rating ? item.rating.toFixed(2) : ""} /><span className="ms-2"> · 130 reviews</span>
						</div>
						<p>{item.city}, {item.country}</p>
						<hr />
						<p>Cottage</p>
						<p>Entire holiday home · 2 bedrooms · 1 bathroom</p>
						<p>2 beds</p>

						<div className="text-end mt-3">
							<span className="text-muted d-block">{nightsCount} {nightsCount > 1 ? <span>nights</span> : <span>night</span>}</span>
							<span className="lato-bold property-card-price d-block">{convertedTotalPrice} {authContext.currency}</span>
						</div>
						
					</div>
				</Link>
			</div>
		</div>
	);
}
