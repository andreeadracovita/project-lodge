import { Link } from "react-router-dom";
import countries from "react-select-country-list";

import "./PropertyListItem.css";
import WishlistIcon from "./WishlistIcon";
import { useAuth } from "components/security/AuthContext";
import Rating from "components/common/Rating";
import { fileStorage } from "utils/constants";
import { convertToPreferredCurrency } from "utils/conversionUtils";
import { capitalizeFirstLetter } from "utils/stringUtils";

type Geo = {
	x: number,
	y: number
};

export type PropertyItem = {
	id: number,
	title: string,
	city: string,
	country: string,
	geo: Geo,
	price_night_site: number,
	rating?: number,
	images_url_array: string[],
	bathrooms?: number,
	bedrooms?: number,
	beds?: number,
	rental_type: string,
	property_type: string
	reviews_no?: number
};

type PropertyListItemProps = {
	item: PropertyItem;
	isPreview: boolean;
	guests?: number;
	checkIn?: string; // formatted string 2025-04-10
	checkOut?: string; // formatted string 2025-04-10
	nightsCount: number;
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
	hideWishlist,
	isCompact
}: PropertyListItemProps) {
	const authContext: any = useAuth();

	const linkPath = !isPreview
		? `/stay?id=${item.id}&guests=${guests ? guests : 1}&check_in=${checkIn}&check_out=${checkOut}`
		: "#";

	const imgUrl = item.images_url_array?.length > 0 ? fileStorage + item.images_url_array[0] : undefined;
	
	const siteCurrencyTotalPrice = item.price_night_site * nightsCount;
	const convertedTotalPrice = Math.ceil(convertToPreferredCurrency(siteCurrencyTotalPrice, authContext.exchangeRate));

	const nightsString = nightsCount + (nightsCount > 1 ? " nights" : " night");
	const guestsString = guests ? ", " + guests + (guests > 1 ? " guests" : " guest") : undefined;
	const priceString = (isPreview ? Math.round(siteCurrencyTotalPrice * 100) / 100 : convertedTotalPrice) + " " + authContext.currency;

	const isRoom = item.rental_type === "room";
	const bedsString = item.beds ? item.beds + (item.beds > 1 ? " beds" : " bed") : "";
	const bedroomsString = item.bedrooms ? item.bedrooms + (item.bedrooms > 1 ? " bedrooms" : " bedroom") : "";
	const bathroomsString = item.bathrooms ? item.bathrooms + (item.bathrooms > 1 ? " bathrooms" : " bathroom") : "";

	return (
		<div className="position-relative">
			<Link to={linkPath}>
				<div className="card-item" style={{ height: isCompact ? "410px" : "550px" }}>
					<img src={imgUrl} className="list-item-photo mb-2" />
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
								<div>{isRoom ? "Room" : capitalizeFirstLetter(item.property_type) }</div>
								{
									!isRoom &&
									<div className="mt-6">Entire holiday home · {bedroomsString} · {bathroomsString}</div>
								}
								<div className="mt-6">{bedsString}</div>
							</div>
						}
						<div className="price-container">
						{
							isCompact
							? <div className="d-flex align-items-center justify-content-end">
								<div className="text-muted d-block me-2">{nightsString}</div>
								<div className="text-bold property-card-price d-block">{priceString}</div>
							</div>
							: <div className="text-end mt-3">
								<div className="text-muted d-block">{nightsString} {guestsString}</div>
								<div className="mt-6 text-bold property-card-price d-block">{priceString}</div>
							</div>
						}
						</div>
					</div>
				</div>
			</Link>
			{ !hideWishlist && <WishlistIcon isPreview={isPreview} itemId={item.id} /> }
		</div>
	);
}
