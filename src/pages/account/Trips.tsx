import { useEffect, useState } from "react";

import { getAllBookings } from "/src/api/BackendApiService";
import BookingListItem from "/src/components/list/BookingListItem";

export default function Trips() {
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		getAllBookings()
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.error(error);
			});
	});

	return (
		<div className="container section-container">
			<h1 className="page-heading">Trips</h1>
			<div className="border-section w-100">
				<h2 className="section-heading">Upcoming</h2>
				<div>
					<span className="d-block">Title</span>
				</div>
			</div>
			<h2 className="section-heading">Completed trips</h2>
			<div className="row cols-4">
				<BookingListItem />
				<BookingListItem />
				<BookingListItem />
				<BookingListItem />
			</div>
		</div>
	);
}
