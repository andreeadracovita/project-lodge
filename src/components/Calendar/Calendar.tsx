import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useSearchParams } from "react-router";

import "./Calendar.css";
import CalendarMonth from "./CalendarMonth";
import { getPropertyAvailability } from "/src/api/BackendApiService";
import { yearDashMonthDashDay } from "/src/utils/DateFormatUtils";

export default function Calendar() {
	const [searchParams, setSearchParams] = useSearchParams();
	const propertyId = searchParams.get("id");
	
	// Left calendar sheet
	const [firstDate, setFirstDate] = useState(() => getFirstDate());
	// Right calendar sheet
	const [secondDate, setSecondDate] = useState(() => getNextMonth(firstDate));
	// Use to switch between check-in and out selections
	const [isRangePicked, setIsRangePicked] = useState(true);

	useEffect(() => {
		if (!propertyId) {
			return;
		}
		// Check check-in - check-out availability from search parameters. If unavailable, clear values.
		const checkIn = searchParams.get("check_in");
		const checkOut = searchParams.get("check_out");

		if (!checkIn || !checkOut) {
			return;
		}

		getPropertyAvailability(propertyId, checkIn, checkOut)
			.then(response => {
				if (response?.data?.available === false) {
					clearSelection();
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	function getFirstDate() {
		const checkIn = searchParams.get("check_in");

		if (checkIn) {
			return new Date(checkIn);
		}
		return new Date();
	}

	function getPrevMonth(date) {
		return date.getMonth() === 0 ? new Date(date.getFullYear() - 1, 11, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1);
	}

	function getNextMonth(date) {
		return date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1);
	}

	function decrementMonth() {
		// Do not decrement past current month
		const today = new Date();
		if (firstDate.getFullYear() === today.getFullYear() && firstDate.getMonth() === today.getMonth()) {
			return;
		}
		setSecondDate(firstDate);
		setFirstDate(() => getPrevMonth(firstDate));
	}

	function incrementMonth() {
		setFirstDate(secondDate);
		setSecondDate(() => getNextMonth(secondDate));
	}

	async function pickDate(date) {
		const checkIn = searchParams.get("check_in");
		if (isRangePicked || (checkIn && date <= new Date(checkIn))) {
			// Start a new range
			searchParams.set("check_in", yearDashMonthDashDay(date));
			searchParams.delete("check_out");
			setSearchParams(searchParams);
			setIsRangePicked(false);
		} else {
			const checkOut = yearDashMonthDashDay(date);
			if (propertyId) {
				const response = await getPropertyAvailability(propertyId, checkIn, checkOut);
				if (response?.data?.available === false) {
					return;
				}
			}
			// Pick check-out date
			searchParams.set("check_out", checkOut);
			setSearchParams(searchParams);
			setIsRangePicked(true);
		}
	}

	function clearSelection() {
		searchParams.delete("check_in");
		searchParams.delete("check_out");
		setSearchParams(searchParams);
		setIsRangePicked(true);
	}

	return (
		<div id="calendar" className="row g-5">
			<div className="col-6">
				<CalendarMonth
					month={firstDate.getMonth()}
					year={firstDate.getFullYear()}
					chevronLeft={true}
					chevronRight={false}
					onLeftChevronClicked={decrementMonth}
					onDateClicked={pickDate}
				/>
			</div>
			<div className="col-6">
				<CalendarMonth
					month={secondDate.getMonth()}
					year={secondDate.getFullYear()}
					chevronLeft={false}
					chevronRight={true}
					onRightChevronClicked={incrementMonth}
					onDateClicked={pickDate}
				/>
			</div>
			<div className="mt-10 d-flex align-items-center cursor-pointer" onClick={clearSelection}>
				<Icon.Eraser size={20} />
				<span className="ms-1">Clear selection</span>
			</div>
		</div>
	);
}
