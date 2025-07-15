import { Link } from "react-router-dom";
import countries from "react-select-country-list";

import "./PropertyListItem.css";
import WishlistIcon from "./WishlistIcon";
import { useAuth } from "/src/components/security/AuthContext";
import { yearDashMonthDashDay } from "/src/utils/DateFormatUtils";
import Rating from "/src/components/common/Rating";
import { fileStorage } from "/src/utils/constants";
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
	isPreview: boolean;
	item: PropertyItem;
	guests: number;
	checkIn: string; // formatted string 2025-04-10
	checkOut: string; // formatted string 2025-04-10
	nightsCount: number;
	hidePrice: boolean;
	hideWishlist: boolean;
	isCompact: boolean;
};

export default function PropertyListItem({
	isPreview,
	item,
	guests,
	checkIn,
	checkOut,
	nightsCount,
	hidePrice,
	hideWishlist,
	isCompact
}: PropertyListItemProps) {
	const authContext = useAuth();

	const linkPath = !isPreview
		? `/stay?id=${item.id}&guests=${guests ? guests : 1}&check_in=${checkIn}&check_out=${checkOut}`
		: "#";

	const imgUrl = item.images_url_array?.length > 0 ? fileStorage + item.images_url_array[0] : null;
	
	const siteCurrencyTotalPrice = item.price_night_site * nightsCount;
	const convertedTotalPrice = convertToPreferredCurrency(siteCurrencyTotalPrice, authContext.exchangeRate);

	const nightsString = nightsCount + (nightsCount > 1 ? " nights" : " night");
	const guestsString = guests ? ", " + guests + (guests > 1 ? " guests" : " guest") : undefined;
	const priceString = (isPreview ? Math.round(siteCurrencyTotalPrice * 100) / 100 : convertedTotalPrice) + " " + authContext.currency;

	return (
		<div className="mb-3">
			<div className="position-relative card-item" style={{ height: isCompact ? "410px" : "550px" }}>
				<Link to={linkPath}><img src={imgUrl} className="list-item-photo mb-2" /></Link>
				
				{ !hideWishlist && <WishlistIcon isPreview={isPreview} itemId={item.id} /> }

				<Link to={linkPath}>
					<div className="property-card-details">
						<div className="property-card-heading">{item.title}</div>
						<div className="mt-6">
							<Rating score={item.rating} reviewsNo={item.reviews_no} />
						</div>
						<div className="mt-6">{item.city}, {countries().getLabel(item.country)}</div>
						{
							!isCompact &&
							<div>
								<hr />
								<div>Cottage</div>
								<div className="mt-6">Entire holiday home · 2 bedrooms · 1 bathroom</div>
								<div className="mt-6">2 beds</div>
							</div>
						}
						<div className="price-container">
						{
							isCompact
							? <div className="d-flex align-items-center justify-content-end">
								<div className="text-muted d-block me-2">{nightsString}</div>
								<div className="lato-bold property-card-price d-block">{priceString}</div>
							</div>
							: <div className="text-end mt-3">
								<div className="text-muted d-block">{nightsString} {guestsString}</div>
								<div className="mt-6 lato-bold property-card-price d-block">{priceString}</div>
							</div>
						}
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
}
