import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useLocation, useNavigate } from "react-router-dom";

import "./Search.css";
import SearchDesktop from "./SearchDesktop";
import SearchMobile from "./SearchMobile";

export default function Search() {
	const location = useLocation();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const [input, setInput] = useState<any>({
		country: searchParams.get("country") ?? "",
		city: searchParams.get("city") ?? "",
		checkIn: searchParams.get("check_in") ?? "",
		checkOut: searchParams.get("check_out") ?? "",
		guests: searchParams.get("guests") ?? 1
	});

	useEffect(() => {
		setInput((prevValue: any) => {
			return {
				...prevValue,
				checkIn: searchParams.get("check_in")
			}
		});
	}, [searchParams.get("check_in")]);

	useEffect(() => {
		setInput((prevValue: any) => {
			return {
				...prevValue,
				checkOut: searchParams.get("check_out")
			}
		});
	}, [searchParams.get("check_out")]);

	function onSearchClicked() {
		if (!input.country) {
			document.getElementById("country")?.focus();
			return;
		}
		if (!input.checkIn || !input.checkOut) {
			document.getElementById("date-range")?.focus();
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

	function handleChange(event: any) {
		const { value, name } = event.target;

		setInput((prevValue: any) => {
			return {
				...prevValue,
				[name]: value
			}
		});
	}

	function handleCountryChange(value: string) {
		setInput((prevValue: any) => {
			return {
				...prevValue,
				country: value
			}
		});
	}

	function onCalendarClick(event: any) {
		event.stopPropagation();
	}

	return (
		<form role="search">
			<div className="d-none d-md-block">
				<SearchDesktop
					input={input}
					handleCountryChange={handleCountryChange}
					handleChange={handleChange}
					onCalendarClick={onCalendarClick}
					onSearchClicked={onSearchClicked}
				/>
			</div>
			<div className="d-block d-md-none">
				<SearchMobile
					input={input}
					handleCountryChange={handleCountryChange}
					handleChange={handleChange}
					onCalendarClick={onCalendarClick}
					onSearchClicked={onSearchClicked}
				/>
			</div>
		</form>
	)
}
