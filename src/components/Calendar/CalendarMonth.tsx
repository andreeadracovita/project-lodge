import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import * as Icon from "react-bootstrap-icons";
import classNames from "classnames";

import "./CalendarMonth.css";
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

	// Selection styling
	function isCheckInDay(dayIndex) {
		if (checkIn) {
			return checkIn.getFullYear() === year && checkIn.getMonth() === month && checkIn.getDate() === dayIndex;
		}
		return false;
	}

	function isCheckOutDay(dayIndex) {
		if (checkOut) {
			return checkOut.getFullYear() === year && checkOut.getMonth() === month && checkOut.getDate() === dayIndex;
		}
		return false;
	}

	function isIntermediaryDay(dayIndex) {
		let queryDate = new Date(year, month, dayIndex);
		if (checkIn && checkOut) {
			if (queryDate > checkIn && queryDate < checkOut) {
				return true;
			}
		}
		return false;
	}

	function isDateAvailable(date) {
		if (date < new Date()) {
			return false;
		}
		for (const booked of bookedDates) {
			if (date >= booked.check_in && date < booked.check_out) {
				return false;
			}
		}
		return true;
	}

	function sanitizeDateClick(isAvailable, date) {
		if (!isAvailable) {
			return;
		}
		onDateClicked(date)
	}

	function renderCalendarDay(index) {
		const date = new Date(year, month, index);
		const isAvailable = isDateAvailable(date);
		const isCheckIn = isCheckInDay(index);
		const isCheckOut = isCheckOutDay(index);

		const containerClass = classNames(
			"calendar-day",
			{
				"highlight": isIntermediaryDay(index),
				"start-highlight": isCheckIn,
				"end-highlight": isCheckOut,
				"unavailable": !isAvailable,
				"cursor-pointer": isAvailable
			}
		);
		const dayClass = classNames(
			"text-center",
			{
				"start-end-checked": isCheckIn || isCheckOut,
				"day-selection-highlight": isAvailable && !isCheckIn && !isCheckOut
			}
		);
		return (
			<div
				key={index}
				className={containerClass}
				onClick={() => sanitizeDateClick(isAvailable, date)}
			>
				<span className={dayClass}>{index}</span>
			</div>
		);
	}

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
					{[...Array(lastDay)].map((_, index) => (
				        renderCalendarDay(index + 1)
			    	))}
				</div>
			</div>
		</div>
	);
}
