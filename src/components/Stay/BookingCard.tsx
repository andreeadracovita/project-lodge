import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router-dom";

import "./BookingCard.css";
import Calendar from "/src/components/calendar/Calendar";
import { useAuth } from "/src/components/security/AuthContext";
import { getNightsCount, dayMonYear } from "/src/utils/DateFormatUtils";
import { convertToPreferredCurrency } from "/src/utils/conversionUtils";

export default function BookingCard({price}) {
	const authContext = useAuth();
	const navigate = useNavigate();
	const [convertedTotalPrice, setConvertedTotalPrice] = useState(0);
	const [nightsCount, setNightsCount] = useState(0);
	const [siteTotalPrice, setSiteTotalPrice] = useState(0);

	const [searchParams, setSearchParams] = useSearchParams();
	const [input, setInput] = useState({
		checkIn: undefined,
		checkOut: undefined,
		guests: searchParams.get("guests") ?? 1
	});

	useEffect(() => {
		const checkInParam = searchParams.get("check_in");
		const checkOutParam = searchParams.get("check_out");
		if (checkInParam) {
			setInput(prevValue => {
				return {
					...prevValue,
					checkIn: new Date(checkInParam),
					checkOut: checkOutParam ? new Date(checkOutParam) : null
				};
			});
		}

		if (!checkInParam || !checkOutParam) {
			return;
		}

		const tempNightCount = getNightsCount(new Date(checkInParam), new Date(checkOutParam));
		setNightsCount(tempNightCount);

		const tempSiteTotalPrice = price * tempNightCount;
		setSiteTotalPrice(tempSiteTotalPrice);

		// getConvertedPrice(authContext.currency, tempSiteTotalPrice)
		// 	.then(response => {
		// 		if (response.data) {
		// 			setConvertedTotalPrice(response.data.converted);
		// 		}
		// 	})
		// 	.catch(error => {
		// 		console.error(error);
		// 	});
		setConvertedTotalPrice(convertToPreferredCurrency(tempSiteTotalPrice, authContext.exchangeRate));
	}, [searchParams.get("check_in"), searchParams.get("check_out")]);

	function handleChange(event) {
		const { name, value } = event.target;
		
		setInput(prevValue => {
			return {
				...prevValue,
				[name]: value
			};
		});
	}

	function onCalendarClick(event) {
		event.stopPropagation();
	}

	function handleBookClick() {
		navigate(`/book?id=${searchParams.get("id")}&guests=${input.guests}&check_in=${searchParams.get("check_in")}&check_out=${searchParams.get("check_out")}`);
	}

	return (
		<div id="booking-card" className="card-item sticky">
			<h2 className="section-heading">{convertedTotalPrice} {authContext.currency}</h2>
			<p>
				{input.guests} {input.guests > 1 ? <span>guests</span> : <span>guest</span>}, {nightsCount} {nightsCount > 1 ? <span>nights</span> : <span>night</span>}
			</p>
			<form>
				<div className="form-field rounded-pill d-flex p-1 w-100">
					<div className="dropdown-center w-100 cursor-pointer px-3">
						<div id="dropdown-toggle" className="d-flex px-2 py-1 align-items-center justify-content-between" data-bs-toggle="dropdown">
							<span className="me-2">
								<span className="d-block">{input.checkIn && "Check-in"}</span>
								<span className="d-block">{input.checkIn ? dayMonYear(new Date(input.checkIn)) : "Check-in"}</span>
							</span>
							<span>—</span>
							<span className="ms-2">
								<span className="d-block">{input.checkOut && "Check-out"}</span>
								<span className="d-block">{input.checkOut ? dayMonYear(new Date(input.checkOut)) : "Check-out"}</span>
							</span>
						</div>
						
						<div className="dropdown-menu p-3" onClick={onCalendarClick}>
							<Calendar />
						</div>
					</div>
				</div>
				<div className="form-field rounded-pill p-1 w-100 mt-3 ps-3">
					<label htmlFor="guests" className="ms-2">Guests</label>
					<br />
					<input
						id="guests"
						type="number"
						className="form-control search-field rounded-pill w-25"
						placeholder="Guests"
						aria-label="number of guests"
						name="guests"
						value={input.guests}
						onChange={handleChange}
					/>
				</div>
				<button type="button" className="btn-pill w-100 mt-3" onClick={handleBookClick}>
					Book
				</button>
			</form>
		</div>
	)
}
