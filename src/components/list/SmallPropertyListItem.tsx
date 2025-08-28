import { Link } from "react-router-dom";
import countries from "react-select-country-list";

import "./SmallPropertyListItem.css";
import WishlistIcon from "./WishlistIcon";
import Rating from "components/common/Rating";
import { useAuth } from "components/security/AuthContext";
import { fileStorage } from "utils/constants";
import { convertToPreferredCurrency } from "utils/conversionUtils";

type SmallPropertyListItemProps = {
	item: any;
	guests?: number;
	checkIn?: string; // formatted string 2025-04-10
	checkOut?: string; // formatted string 2025-04-10
	nightsCount: number;
};

export default function SmallPropertyListItem({
	item,
	guests,
	checkIn,
	checkOut,
	nightsCount
}: SmallPropertyListItemProps) {
	const authContext: any = useAuth();

	const linkPath = `/stay?id=${item.id}&guests=${guests ? guests : 1}&check_in=${checkIn}&check_out=${checkOut}`;
	const imgUrl = item.images_url_array?.length > 0 ? fileStorage + item.images_url_array[0] : undefined;

	const siteCurrencyTotalPrice = item.price_night_site * nightsCount;
	const convertedTotalPrice = Math.ceil(convertToPreferredCurrency(siteCurrencyTotalPrice, authContext.exchangeRate));

	const nightsString = nightsCount + (nightsCount > 1 ? " nights" : " night");
	const priceString = convertedTotalPrice + " " + authContext.currency;

	return (
		<div className="p-2">
			<div className="position-relative">
				<Link to={linkPath}>
					<div id={`small-prop-` + item.id} className="row small-property-item border-section p-2" tabIndex={0}>
						<div className="col-4 p-0">
							<img src={imgUrl} className="cover-image mb-2" />
						</div>
						<div className="col-8">
							<div className="property-card-details">
								<div className="property-card-heading">{item.title}</div>
								<div className="mt-6">
									<Rating score={item.rating} reviewsNo={item.reviews_no} />
								</div>
								<div className="mt-6">{item.city}, {countries().getLabel(item.country)}</div>
								<div className="price-container text-end">
									<div className="text-muted d-block">{nightsString}</div>
									<div className="text-bold property-card-price d-block">{priceString}</div>
								</div>
							</div>
						</div>
					</div>
				</Link>
				<WishlistIcon itemId={item.id} isPreview={false} />
			</div>
		</div>
	)
}