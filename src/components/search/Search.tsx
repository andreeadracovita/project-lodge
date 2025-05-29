import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

import Calendar from "../Calendar/Calendar";
import { dayMonYear } from "/src/utils/DateFormatUtils";
import "./Search.css";

function Search() {
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
		navigate(`/searchresults?destination=${input.destination}&check_in=${input.checkIn}&check_out=${input.checkOut}&guests=${input.guests}`);
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
		<div>
			<form className="mb-3 mb-lg-0 d-flex align-items-center" role="search">
				<div id="search-bar" className="rounded-pill d-flex p-1 w-100">
					<input
						id="destination"
						type="search"
						className="form-control search-field rounded-pill w-75"
						placeholder="Where?"
						aria-label="destination"
						name="destination"
						value={input.destination}
						onChange={handleChange}
						autocomplete="off"
					/>

					<div className="vr"></div>

					<div className="dropdown-center w-50 d-flex align-items-center justify-content-center cursor-pointer">
						<div id="dropdown-toggle" className="d-flex px-2 py-1" data-bs-toggle="dropdown">
							<span className="me-2">{input.checkIn ? dayMonYear(new Date(input.checkIn)) : "Check-in"}</span>
							—
							<span className="ms-2">{input.checkOut ? dayMonYear(new Date(input.checkOut)) : "Check-out"}</span>
						</div>
						
						<div className="dropdown-menu p-3" onClick={onCalendarClick}>
							<Calendar />
						</div>
					</div>

					<div className="vr"></div>

					<div className="w-50">
						<label htmlFor="guests" className="ms-2">Guests</label>
						<input
							id="guests"
							type="number"
							className="form-control search-field rounded-pill w-50"
							placeholder="Guests"
							aria-label="number of guests"
							name="guests"
							value={input.guests}
							onChange={handleChange}
						/>
					</div>
					<button
						id="search-button"
						type="button"
						className="btn btn-light rounded-pill brand-color-background"
						onClick={onSearchClicked}
					>
						Search
					</button>
				</div>
			</form>
		</div>
	)
}

export default Search