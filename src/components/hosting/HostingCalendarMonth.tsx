import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import classNames from "classnames";

import HostingCalendarDay from "./HostingCalendarDay";
import { getBookedByPropertyIdForDate } from "api/BackendApiService";
import { yearDashMonthDashDay } from "utils/dateUtils";

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

	return (
		<div id={id} className="mt-10">
			<div>
				<div className="page-heading">
					{monthNames[month]} {year !== new Date().getFullYear() ? year : "" }
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
				        <HostingCalendarDay
				        	key={year * 10000 + month * 100 + index + 1}
				        	id={year * 10000 + month * 100 + index + 1}
				        	year={year}
				        	month={month}
				        	day={index + 1}
				        />
			    	))}
				</div>
			</div>
		</div>
	);
}