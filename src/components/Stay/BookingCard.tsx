import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import "./BookingCard.css";
import { getConvertedPrice } from "/src/api/BackendApiService";
import { useAuth } from "/src/components/security/AuthContext";
import { getNightsCount } from "/src/utils/DateFormatUtils";

export default function BookingCard({price}) {
	const authContext = useAuth();
	const [convertedTotalPrice, setConvertedTotalPrice] = useState(0);

	const [searchParams, setSearchParams] = useSearchParams();
	const checkIn = searchParams.get("check_in");
	const checkOut = searchParams.get("check_out");
	const guests = searchParams.get("guests");
	const checkInDate = new Date(checkIn);
	const checkOutDate = new Date(checkOut);
	const nightsCount = getNightsCount(checkInDate, checkOutDate);

	const siteTotalPrice = price * nightsCount;
	useEffect(() => {
		getConvertedPrice(authContext.currency, siteTotalPrice)
			.then(response => {
				if (response.data) {
					setConvertedTotalPrice(response.data.converted);
				}
			})
			.catch(error => {
				console.error(error);
			})
	}, []);

	return (
		<div id="booking-card" className="border-section sticky">
			<h2>{convertedTotalPrice} {authContext.currency}</h2>
			<p>
				{guests} {guests > 1 ? <span>guests</span> : <span>guest</span>}, {nightsCount} {nightsCount > 1 ? <span>nights</span> : <span>night</span>}
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
				<button type="button" className="btn-pill w-100 mt-3">
					Book
				</button>
			</form>
		</div>
	)
}
