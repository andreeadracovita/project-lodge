import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { checkViewBookingAuthorization } from "/src/api/BackendApiService";
import BookingDetails from "/src/components/booking/BookingDetails";
import BookingUnauthGate from "/src/components/booking/BookingUnauthGate";
import { useAuth } from "/src/components/security/AuthContext";

export default function Booking() {
	const authContext = useAuth();
	const [searchParams, setSearchParams] = useSearchParams();
	const [showGate, setShowGate] = useState(true);
	const bookingId = searchParams.get("id");

	useEffect(() => {
		if (!bookingId) {
			navigate("/");
		}
		// Show gate when: user is unauthenticated -> pre-fill form with search query info
		// If booking email does not match auth user email
		if (authContext.isAuthenticated) {
			checkViewBookingAuthorization(bookingId)
				.then(response => {
					// Booking email matches authenticated user email
					if (response.data?.authorized === true) {
						setShowGate(false);
					}
				})
				.catch(error => {
					console.error(error);
				});
		}
	}, []);
	
	return (
		<div className="container section-container">
			{
				showGate
				? <BookingUnauthGate setShowGate={setShowGate} />
				: <BookingDetails />
			}
			
		</div>
	);
}