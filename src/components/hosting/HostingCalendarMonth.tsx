import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import * as Icon from "react-bootstrap-icons";
import classNames from "classnames";

import "./HostingCalendarMonth.css";
import { getBookedByPropertyIdForDate } from "/src/api/BackendApiService";
import { yearDashMonthDashDay } from "/src/utils/DateFormatUtils";

// TODO: Customize booking calendar to show host calendar
export default function HostingCalendarMonth({ id, month, year }) {
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

	// Calendar sheet setup
	const firstDayOfMonth = new Date(year, month, 1);
	let firstDayOfMonthCount = firstDayOfMonth.getDay(); // Sunday - Saturday : 0 - 6
	// Monday - Sunday : 0 - 6, how much padding to use before starting rendering day numbers
	const dayPadding = firstDayOfMonthCount - 1 >= 0 ? firstDayOfMonthCount - 1 : 6; // Sunday -> 6
	const lastDay = (new Date(year, month + 1, 0)).getDate();

	// Styling
	function isPastDate(dayIndex) {
		// TODO: current day should not be past
		const date = new Date(year, month, dayIndex);
		if (date < new Date()) {
			return true;
		}
		return false;
	}

	function isCheckInDay(dayIndex) {
		// Search ranges
		return false;
	}

	function isCheckOutDay(dayIndex) {
		// Search ranges
		return false;
	}

	function isIntermediaryDay(dayIndex) {
		// Search ranges
		return false;
	}

	function isDateAvailable(date) {
		return true;
	}

	function renderCalendarDay(index) {
		const date = new Date(year, month, index);
		const isCheckIn = isCheckInDay(index);
		const isCheckOut = isCheckOutDay(index);

		const containerClass = classNames(
			"calendar-day",
			"d-flex",
			"flex-wrap",
			"justify-content-start",
			"p-2",
			{
				"past": isPastDate(index),
				"booked": isIntermediaryDay(index),
				"start-booked": isCheckIn,
				"end-booked": isCheckOut
			}
		);
		return (
			<div
				id={id*100+index}
				key={index}
				className={containerClass}
				onClick={() => {}}
			>
				<div className="w-100">{index}</div>
				
				<div>80 CHF</div>
			</div>
		);
	}

	return (
		<div id={id} className="mt-10">
			<div id="calendar-header">
				<div className="page-heading">
					{monthNames[month]} {year !== new Date().getFullYear() ? year : "" }
				</div>
				<div className="days-grid mt-2">
					{weekDays.map((day, i) => 
						<span key={i} className="col day-initial text-center">{day}</span>
					)}
				</div>
			</div>
			<div id="calendar-days">
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