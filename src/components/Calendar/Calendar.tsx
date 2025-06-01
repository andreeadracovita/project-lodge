import { useSearchParams } from "react-router";
import { useState } from "react";

import { yearDashMonthDashDay } from "/src/utils/DateFormatUtils";
import CalendarMonth from "./CalendarMonth";
import "./Calendar.css";

export default function Calendar() {
	const [searchParams, setSearchParams] = useSearchParams();
	
	// Left calendar sheet
	const [firstDate, setFirstDate] = useState(() => getFirstDate());
	// Right calendar sheet
	const [secondDate, setSecondDate] = useState(() => getNextMonth(firstDate));
	// Use to switch between check-in and out selections
	const [isDatePicked, setIsDatePicked] = useState(true);

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
		setSecondDate(firstDate);
		setFirstDate(() => getPrevMonth(firstDate));
	}

	function incrementMonth() {
		setFirstDate(secondDate);
		setSecondDate(() => getNextMonth(secondDate));
	}

	function pickDate(date) {
		if (isDatePicked) {
			// Pick check-in date
			searchParams.set("check_in", yearDashMonthDashDay(date));
			searchParams.delete("check_out");
			setSearchParams(searchParams);
			setIsDatePicked(false);
		} else {
			// Pick check-out date
			searchParams.set("check_out", yearDashMonthDashDay(date));
			setSearchParams(searchParams);
			setIsDatePicked(true);
		}
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
		</div>
	);
}
