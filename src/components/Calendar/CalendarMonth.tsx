import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import * as Icon from "react-bootstrap-icons";

import "./CalendarMonth.css";
import CalendarDay from "./CalendarDay";
import { getBookedByPropertyIdForDate } from "/src/api/BackendApiService";
import { yearDashMonthDashDay } from "/src/utils/DateFormatUtils";

/*
	Month: 0 - 11
*/
export default function CalendarMonth({month, year, chevronLeft, chevronRight, onLeftChevronClicked, onRightChevronClicked, onDateClicked}) {
	const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	const [checkIn, setCheckIn] = useState();
	const [checkOut, setCheckOut] = useState();
	const [searchParams, setSearchParams] = useSearchParams();
	const [bookedDates, setBookedDates] = useState([]);
	const propertyId = searchParams.get("id");

	useEffect(() => {
		if (!propertyId) {
			return;
		}
		getBookedByPropertyIdForDate(propertyId, yearDashMonthDashDay(new Date(year, month, 1)))
			.then(response => {
				const newBookedRanges = response.data.map(entry => {
					return {
						check_in: new Date(entry.check_in),
						check_out: new Date(entry.check_out)
					}
				});
				setBookedDates(newBookedRanges);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		const checkInString = searchParams.get("check_in");
		const checkOutString = searchParams.get("check_out");
		if (checkInString === null) {
			setCheckIn(undefined);
			setCheckOut(undefined);
		}

		if (checkInString) {
			setCheckIn(new Date(checkInString));
			setCheckOut(undefined);
		}
		if (checkOutString) {
			setCheckOut(new Date(checkOutString));
		} else {
			setCheckOut(undefined);
		}
	}, [searchParams.get("check_in"), searchParams.get("check_out")]);

	// Calendar sheet setup
	const firstDayOfMonth = new Date(year, month, 1);
	let firstDayOfMonthCount = firstDayOfMonth.getDay(); // Sunday - Saturday : 0 - 6
	// Monday - Sunday : 0 - 6, how much padding to use before starting rendering day numbers
	const dayPadding = firstDayOfMonthCount - 1 >= 0 ? firstDayOfMonthCount - 1 : 6; // Sunday -> 6
	const lastDay = (new Date(year, month + 1, 0)).getDate();

	return (
		<div>
			<div>
				<div className="d-flex">
					<div className="col-2">
						{chevronLeft && <span className="cursor-pointer"><Icon.ChevronLeft onClick={onLeftChevronClicked} /></span>}
					</div>
					<div className="col-8 text-center">{monthNames[month]} {year}</div>
					<div className="col-2 d-flex justify-content-end">
						{chevronRight && <span className="cursor-pointer"><Icon.ChevronRight onClick={onRightChevronClicked} /></span>}
					</div>
				</div>
				<div className="days-grid mt-2">
					{weekDays.map((day, i) => 
						<span key={i} className="col day-initial text-center">{day}</span>
					)}
				</div>
			</div>
			<div>
				<div className="days-grid mt-2">
					{[...Array(dayPadding)].map((_, index) => (
				        <span key={index}></span>
				    ))}
					{[...Array(lastDay)].map((_, index) => 
				        <CalendarDay
				        	key={index}
				        	year={year}
				        	month={month}
				        	day={index + 1}
				        	checkIn={checkIn}
				        	checkOut={checkOut}
				        	bookedDates={bookedDates}
				        	handleDateClicked={onDateClicked}
				        />
			    	)}
				</div>
			</div>
		</div>
	);
}
