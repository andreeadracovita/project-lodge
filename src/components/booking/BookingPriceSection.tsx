import * as Icon from "react-bootstrap-icons";
import { useSearchParams } from "react-router";

import { useAuth } from "/src/components/security/AuthContext";
import { getNightsCount } from "/src/utils/DateFormatUtils";
import { convertToPreferredCurrency } from "/src/utils/conversionUtils";

export default function BookingPriceSection({ item }) {
	const authContext = useAuth();
	const [searchParams, setSearchParams] = useSearchParams();
	const checkInDate = new Date(searchParams.get("check_in"));
	const checkOutDate = new Date(searchParams.get("check_out"));
	const nightsCount = getNightsCount(checkInDate, checkOutDate);
	const localTotalPrice = item.price_night_local * nightsCount;
	const siteTotalPrice = item.price_night_site * nightsCount;
	const convertedTotalPrice = convertToPreferredCurrency(siteTotalPrice, authContext.exchangeRate);
	
	return (
		<div className="border-section ">
			<h2 className="property-card-heading">Your price summary</h2>
			<div className="highlight text-end">
				<div className="mt-10 property-card-price text-strong">Price { convertedTotalPrice } { authContext.currency }</div>
				<div>In property currency: { localTotalPrice } { item.local_currency }</div>
			</div>
			<div className="mt-10">
				<h3 className="property-card-heading">Price information</h3>
				<div className="mt-10 row">
					<div className="col-2 d-flex align-items-center">
						<Icon.CurrencyExchange size={24} />
					</div>
					<div className="col-10">This price is converted to show you the approximate cost in { authContext.currency }. You'll pay in { item.local_currency }. The exchange rate may change before you pay.</div>
				</div>
				<div className="mt-10 row">
					<div className="col-2 d-flex align-items-center">
						<Icon.CreditCard size={24} />
					</div>
					<div className="col-10">Bear in mind that your card issuer may charge you a foreign transaction fee.</div>
				</div>
			</div>
		</div>
	);
}