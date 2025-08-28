import { CreditCard, CurrencyExchange } from "react-bootstrap-icons";
import { useSearchParams } from "react-router";

import { useAuth } from "components/security/AuthContext";
import { getNightsCount } from "utils/dateUtils";
import { convertToPreferredCurrency } from "utils/conversionUtils";

type BookingPriceSectionProps = {
	item: any
};

export default function BookingPriceSection({ item }: BookingPriceSectionProps) {
	const authContext: any = useAuth();
	const [searchParams] = useSearchParams();
	const checkInParam = searchParams.get("check_in");
	const checkOutParam = searchParams.get("check_out");
	const checkInDate = checkInParam ? new Date(checkInParam) : undefined;
	const checkOutDate = checkOutParam ? new Date(checkOutParam) : undefined;
	const nightsCount = checkInParam && checkOutParam ? getNightsCount(checkInDate, checkOutDate) : 0;
	const localTotalPrice = item.price_night_local * nightsCount;
	const siteTotalPrice = item.price_night_site * nightsCount;
	const convertedTotalPrice = convertToPreferredCurrency(siteTotalPrice, authContext.exchangeRate);
	
	return (
		<div className="border-section ">
			<h2 className="property-card-heading">Your price summary</h2>
			<div className="highlight text-end">
				<div className="mt-10 property-card-price text-bold">Price { convertedTotalPrice } { authContext.currency }</div>
				<div>In property currency: { localTotalPrice } { item.local_currency }</div>
			</div>
			<div className="mt-10">
				<h3 className="property-card-heading">Price information</h3>
				<div className="mt-10 row">
					<div className="col-2 d-flex align-items-center">
						<CurrencyExchange size={24} />
					</div>
					<div className="col-10">This price is converted to show you the approximate cost in { authContext.currency }. You'll pay in { item.local_currency }. The exchange rate may change before you pay.</div>
				</div>
				<div className="mt-10 row">
					<div className="col-2 d-flex align-items-center">
						<CreditCard size={24} />
					</div>
					<div className="col-10">Bear in mind that your card issuer may charge you a foreign transaction fee.</div>
				</div>
			</div>
		</div>
	);
}