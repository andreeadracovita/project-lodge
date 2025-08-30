import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router-dom";

import "./BookingCard.css";
import Calendar from "components/calendar/Calendar";
import { useAuth } from "components/security/AuthContext";
import { getNightsCount, dayMonYear } from "utils/dateUtils";
import { convertToPreferredCurrency } from "utils/conversionUtils";

type BookingCardProps = {
	price: number,
	maxGuests: number
};

export default function BookingCard({ price, maxGuests }: BookingCardProps ) {
	const authContext: any = useAuth();
	const navigate = useNavigate();
	const [convertedTotalPrice, setConvertedTotalPrice] = useState(0);
	const [nightsCount, setNightsCount] = useState(0);

	const [searchParams] = useSearchParams();
	const [input, setInput] = useState({
		checkIn: undefined,
		checkOut: undefined,
		guests: searchParams.get("guests") ? Math.min(parseInt(searchParams.get("guests")!), maxGuests) : 1
	});

	useEffect(() => {
		const checkInParam = searchParams.get("check_in");
		const checkOutParam = searchParams.get("check_out");
		if (!checkInParam && !checkOutParam) {
			setInput((prevValue: any) => {
				return {
					...prevValue,
					checkIn: undefined,
					checkOut: undefined
				};
			});
			return;
		}

		if (checkInParam) {
			setInput((prevValue: any) => {
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
		setConvertedTotalPrice(convertToPreferredCurrency(tempSiteTotalPrice, authContext.exchangeRate));
	}, [searchParams.get("check_in"), searchParams.get("check_out")]);

	function handleChange(event: any) {
		const { name, value } = event.target;
		
		setInput((prevValue: any) => {
			return {
				...prevValue,
				[name]: value
			};
		});
	}

	function onCalendarClick(event: any) {
		event.stopPropagation();
	}

	function handleBookClick() {
		const checkIn = searchParams.get("check_in");
		const checkOut = searchParams.get("check_out");
		if (!checkIn || !checkOut) {
			document.getElementById("date-range")?.focus();
			return;
		}
		navigate(`/book?id=${searchParams.get("id")}&guests=${input.guests}&check_in=${searchParams.get("check_in")}&check_out=${searchParams.get("check_out")}`);
	}

	return (
		<div id="booking-card" className="card-item sticky">
			<h2 className="section-heading">{convertedTotalPrice} {authContext.currency}</h2>
			<p>
				{input.guests} {input.guests > 1 ? <span>guests</span> : <span>guest</span>}, {nightsCount} {nightsCount > 1 ? <span>nights</span> : <span>night</span>}
			</p>
			<form>
				<div className="form-field rounded-pill d-flex px-4 py-2 w-100">
					<div id="date-range" className="dropdown-center w-100 cursor-pointer focusable rounded-pill" tabIndex={0}>
						<div id="dropdown-toggle" className="d-flex align-items-center justify-content-between" data-bs-toggle="dropdown">
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
				<div className="form-field rounded-pill w-100 mt-3 px-4 py-2 d-flex align-items-center">
					<label htmlFor="guests">Guests</label>
					<input
						id="guests"
						type="number"
						className="form-control search-field rounded-pill w-25 ms-2"
						placeholder="Guests"
						aria-label="number of guests"
						name="guests"
						max={maxGuests}
						min={1}
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
