import { Country, City }  from "country-state-city";
import { useEffect, useMemo, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useSearchParams } from "react-router";
import { useLocation, useNavigate } from "react-router-dom";

import "./Search.css";
import Calendar from "/src/components/calendar/Calendar";
import CountrySelect from "/src/components/common/CountrySelect";
import { dayMonYear } from "/src/utils/dateUtils";

export default function Search() {
	const location = useLocation();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const [input, setInput] = useState({
		country: searchParams.get("country") ?? "",
		city: searchParams.get("city") ?? "",
		checkIn: searchParams.get("check_in") ?? "",
		checkOut: searchParams.get("check_out") ?? "",
		guests: searchParams.get("guests") ?? 1
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
		if (!input.country) {
			document.getElementById("country").focus();
			return;
		}
		if (!input.checkIn || !input.checkOut) {
			document.getElementById("date-range").focus();
			return;
		}
		if (location.pathname === "/search-results") {
			searchParams.set("country", input.country);
			searchParams.set("city", input.city);
			searchParams.set("check_in", input.checkIn);
			searchParams.set("check_out", input.checkOut);
			searchParams.set("guests", input.guests);
			setSearchParams(searchParams);
		} else {
			navigate(`/search-results?country=${input.country}&city=${input.city}&check_in=${input.checkIn}&check_out=${input.checkOut}&guests=${input.guests}`);
		}
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

	function handleCountryChange(value) {
		setInput((prevValue) => {
			return {
				...prevValue,
				country: value
			}
		});
	}

	function onCalendarClick(event) {
		event.stopPropagation();
	}

	return (
		<form role="search">
			<div id="search-bar" className="rounded-pill p-1 px-2 w-100 d-flex align-items-center justify-content-between pill-container">
				<div className="d-flex w-50 align-items-center justify-content-center">
					<Icon.GeoAlt size={24} />
					<div className="w-50 ms-2">
						<CountrySelect
							id="country"
							initialValue={input.country}
							handleFormChange={handleCountryChange}
						/>
					</div>
					<input
						id="city"
						type="search"
						className="form-control search-field rounded-pill w-25 ms-2"
						placeholder="City"
						aria-label="city"
						name="city"
						value={input.city}
						onChange={handleChange}
						autoComplete="off"
						required
					/>
				</div>

				<div className="vr"></div>

				<div className="d-flex w-25 justify-content-center align-items-center">
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
						className="form-control search-field rounded-pill w-25"
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
