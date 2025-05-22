import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

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
					/>
					<div className="vr"></div>
					<div className="w-25">
						<label htmlFor="check-in" className="ms-2">Check-in</label>
						<input
							id="check-in"
							type="date"
							className="form-control search-field rounded-pill"
							placeholder="Check-in"
							aria-label="check-in"
							name="checkIn"
							value={input.checkIn}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label htmlFor="check-out" className="ms-2">Check-out</label>
						<input
							id="check-out"
							type="date"
							className="form-control search-field rounded-pill"
							placeholder="Check-out"
							aria-label="check-out"
							name="checkOut"
							value={input.checkOut}
							onChange={handleChange}
						/>
					</div>
					<div className="vr"></div>
					<div className="w-50">
						<label htmlFor="guests" className="ms-2">Guests</label>
						<input
							id="guests"
							type="number"
							className="form-control search-field rounded-pill"
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