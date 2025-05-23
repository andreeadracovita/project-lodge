import { useSearchParams } from "react-router";

import "./BookingCard.css";

function BookingCard({price}) {
	const [searchParams, setSearchParams] = useSearchParams();
	const checkIn = searchParams.get("check_in");
	const checkOut = searchParams.get("check_out");
	const guests = searchParams.get("guests");
	const currency = "CHF";

	function getNightsNo() {
		const diffTime = new Date(checkOut) - new Date(checkIn);
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	}

	const nights = getNightsNo();

	// TODO: Extract to PricingUtils
	const taxPercentage = 0.15;
	const priceBeforeTax = price * nights;
	const addedTax = Math.ceil(priceBeforeTax * taxPercentage);
	const total = priceBeforeTax + addedTax;

	return (
		<div id="booking-card" className="sticky">
			<h2>{total} {currency}</h2>
			<p>
				{guests} {guests > 1 ? <span>guests</span> : <span>guest</span>}, {nights} {nights > 1 ? <span>nights</span> : <span>night</span>}
			</p>
			<form>
				<div className="form-field rounded-pill d-flex p-1 w-100">
					<div className="w-50 ps-3">
						<label htmlFor="check-in" className="ms-2">Check-in</label>
						<input id="check-in" type="date" className="form-control search-field rounded-pill" placeholder="Check-in" aria-label="check-in" value={checkIn}/>
					</div>
					<div className="vr"></div>
					<div className="w-50 ps-3">
						<label htmlFor="check-out" className="ms-2">Check-out</label>
						<input id="check-out" type="date" className="form-control search-field rounded-pill" placeholder="Check-out" aria-label="check-out" value={checkOut} />
					</div>
				</div>
				<div className="form-field rounded-pill p-1 w-100 mt-3 ps-3">
					<label htmlFor="guests" className="ms-2">Guests</label>
					<br />
					<input id="guests" type="number" className="form-control search-field rounded-pill" placeholder="Guests" aria-label="number of guests" value={guests} />
				</div>
				<button type="button" className="btn btn-light rounded-pill brand-color-background w-100 mt-3">
					Book
				</button>
			</form>
		</div>
	)
}

export default BookingCard;