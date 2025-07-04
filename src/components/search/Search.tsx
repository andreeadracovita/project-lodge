import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

import Calendar from "../Calendar/Calendar";
import { dayMonYear } from "/src/utils/DateFormatUtils";
import "./Search.css";

export default function Search() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const [input, setInput] = useState({
		destination: searchParams.get("destination") ?? "",
		checkIn: searchParams.get("check_in") ?? "",
		checkOut: searchParams.get("check_out") ?? "",
		guests: searchParams.get("guests") ?? ""
	});

	useEffect(() => {
		setInput(prevValue => {
			return {
				...prevValue,
				checkIn: searchParams.get("check_in")
			}
		});
	}, [searchParams.get("check_in")]);

	useEffect(() => {
		setInput(prevValue => {
			return {
				...prevValue,
				checkOut: searchParams.get("check_out")
			}
		});
	}, [searchParams.get("check_out")]);

	function onSearchClicked() {
		if (!input.destination) {
			document.getElementById("destination").focus();
			return;
		}
		if (!input.checkIn || !input.checkOut) {
			console.log("Focus date");
			document.getElementById("date-range").focus();
			return;
		}
		navigate(`/search-results?destination=${input.destination}&check_in=${input.checkIn}&check_out=${input.checkOut}&guests=${input.guests}`);
	}

	function handleChange(event) {
		const { value, name } = event.target;

		setInput((prevValue) => {
			return {
				...prevValue,
				[name]: value
			}
		});
	}

	function onCalendarClick(event) {
		event.stopPropagation();
	}

	return (
		<form role="search">
			<div id="search-bar" className="rounded-pill p-1 px-2 w-100 d-flex align-items-center justify-content-between pill-container">
				<div className="d-flex w-25 align-items-center">
					<Icon.GeoAlt size={24} />
					<input
						id="destination"
						type="search"
						className="form-control search-field rounded-pill"
						placeholder="Where?"
						aria-label="destination"
						name="destination"
						value={input.destination}
						onChange={handleChange}
						autoComplete="off"
						required
					/>
				</div>

				<div className="vr"></div>

				<div className="d-flex w-50 justify-content-center align-items-center">
					<Icon.CalendarRange size={24} />
					<div
						id="date-range"
						className="dropdown-center d-flex align-items-center cursor-pointer focusable rounded-pill"
						tabIndex="0"
					>
						<div id="dropdown-toggle" className="d-flex px-2 py-1" data-bs-toggle="dropdown">
							<span className="me-2">{input.checkIn ? dayMonYear(new Date(input.checkIn)) : "Check-in"}</span>
							—
							<span className="ms-2">{input.checkOut ? dayMonYear(new Date(input.checkOut)) : "Check-out"}</span>
						</div>
						
						<div className="dropdown-menu p-3" onClick={onCalendarClick}>
							<Calendar />
						</div>
					</div>
				</div>

				<div className="vr"></div>

				<div className="d-flex align-items-center w-25 ms-2">
					<Icon.People size={24} />
					<label htmlFor="guests" className="ms-2 mt-0">Guests:</label>
					<input
						id="guests"
						type="number"
						className="form-control search-field rounded-pill w-auto"
						placeholder="1"
						aria-label="number of guests"
						name="guests"
						value={input.guests}
						onChange={handleChange}
						required
					/>
				</div>
				<button
					id="search-button"
					type="button"
					className="btn-round"
					onClick={onSearchClicked}
				>
					<Icon.Search id="search-icon" color="white" size={20} />
				</button>
			</div>
		</form>
	)
}
