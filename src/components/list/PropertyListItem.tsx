import { Link } from "react-router-dom";

import "./PropertyListItem.css";
import WishlistIcon from "./WishlistIcon";
import { useAuth } from "/src/components/security/AuthContext";
import { yearDashMonthDashDay } from "/src/utils/DateFormatUtils";
import Rating from "/src/components/common/Rating";
import { fileStorage } from "/src/utils/constants";

type Geo = {
	x: number,
	y: number
}

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
	const isFavorite = false;

	let displayDate = "";
	let checkInParam = "";
	let checkOutParam = "";
	if (checkIn && checkOut) {
		displayDate = checkIn.getDate() + " " + checkIn.toLocaleString('default', {month: 'long'}) +
		" - " + checkOut.getDate() + " " + checkOut.toLocaleString('default', {month: 'long'}); // 1 May - 2 May (Year if not current)
		checkInParam = yearDashMonthDashDay(checkIn);
		checkOutParam = yearDashMonthDashDay(checkOut);
	}

	const linkPath = isLink
		? {
			pathname: `/stay`,
			search: `?id=${item.id}&guests=2&check_in=${checkInParam}&check_out=${checkOutParam}`
		}
		: {};

	const imgUrl = item.images_url_array.length > 0 ? fileStorage + item.images_url_array[0] : null;

	return (
		<div className="mb-3">
			<div className="position-relative">
				<Link to={linkPath}><img src={imgUrl} className="list-item-photo mb-2" /></Link>
				<WishlistIcon itemId={item.id} />
				<Link to={linkPath}>
					<div>
						<p className="mb-0">{item.title}</p>
						<p className="lato-bold">{item.city}, {item.country}</p>
						<p className="text-muted">{displayDate}</p>
						<p><span className="lato-bold">{item.price}</span> {authContext.currency} total</p>
						<Rating score={item.rating ? item.rating.toFixed(2) : ""} />
					</div>
				</Link>
			</div>
		</div>
	);
}
