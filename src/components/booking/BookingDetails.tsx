import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { getBookingById } from "/src/api/BackendApiService";

export default function BookingDetails() {
	const [searchParams, setSearchParams] = useSearchParams();
	const bookingId = searchParams.get("id");
	const pinCode = searchParams.get("pin");

	useEffect(() => {
		if (bookingId && pinCode) {
			getBookingById(bookingId, pinCode)
				.then(response => {
					// Populate component
					console.log(response.data);
				})
				.catch(error => {
					console.error(error);
				});
		}
	}, []);
	
	return (
		<>
			<h1 className="page-heading">Your booking</h1>
			<h2 className="section-heading">Booking confirmation</h2>
			<p>Confirmation number: <span className="lato-bold">{bookingId}</span></p>
			<p>PIN code: <span className="lato-bold">{pinCode}</span></p>

			<p>Property title</p>
			<p>Check-in, check-out, time</p>
			<p>Nights</p>
			<p>Address</p>
			<p>GPS coords</p>

			<p>Price total</p>
			<p>Map</p>

			<p>Type of building</p>
			<p>Guest name</p>
			<p>Features</p>
		</>
	);
}