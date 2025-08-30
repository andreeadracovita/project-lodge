import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

import "./CalendarMonth.css";
import CalendarDay from "./CalendarDay";
import { getBookedByPropertyIdForDate } from "api/BackendApiService";
import { yearDashMonthDashDay } from "utils/dateUtils";

type CalendarMonthProps = {
	month: number,
	year: number,
	chevronLeft: boolean,
	chevronRight: boolean,
	onLeftChevronClicked: any,
	onRightChevronClicked: any,
	onDateClicked: any
};

/*
	Month: 0 - 11
*/
export default function CalendarMonth({ month, year, chevronLeft, chevronRight, onLeftChevronClicked, onRightChevronClicked, onDateClicked }: CalendarMonthProps) {
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

	const [checkIn, setCheckIn] = useState<Date | undefined>();
	const [checkOut, setCheckOut] = useState<Date | undefined>();
	const [searchParams] = useSearchParams();
	const [bookedDates, setBookedDates] = useState([]);
	const propertyId = searchParams.get("id");

	useEffect(() => {
		if (!propertyId) {
			return;
		}
		getBookedByPropertyIdForDate(parseInt(propertyId), yearDashMonthDashDay(new Date(year, month, 1)))
			.then(response => {
				const newBookedRanges = response.data.map((entry: any) => {
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
						{chevronLeft && <span className="cursor-pointer"><ChevronLeft onClick={onLeftChevronClicked} /></span>}
					</div>
					<div className="col-8 text-center">{monthNames[month]} {year}</div>
					<div className="col-2 d-flex justify-content-end">
						{chevronRight && <span className="cursor-pointer"><ChevronRight onClick={onRightChevronClicked} /></span>}
					</div>
				</div>
				<div className="days-grid mt-2">
					{weekDays.map((day: string, i: number) => 
						<span key={i} className="col day-initial text-center">{day}</span>
					)}
				</div>
			</div>
			<div>
				<div className="days-grid mt-2">
					{[...Array(dayPadding)].map((_: any, index: number) => (
				        <span key={index}></span>
				    ))}
					{[...Array(lastDay)].map((_: any, index: number) => 
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
