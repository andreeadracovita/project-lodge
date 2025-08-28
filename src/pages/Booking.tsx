import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { checkViewBookingAuthorization } from "api/BackendApiService";
import BookingConfirmation from "components/booking/BookingConfirmation";
import BookingUnauthGate from "components/booking/BookingUnauthGate";
import { useAuth } from "components/security/AuthContext";

export default function Booking() {
	const authContext: any = useAuth();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [showGate, setShowGate] = useState(true);
	const bookingId = searchParams.get("id");

	useEffect(() => {
		if (!bookingId) {
			navigate("/");
			return;
		}
		// Show gate when: user is unauthenticated -> pre-fill form with search query info
		// If booking email does not match auth user email
		if (authContext.isAuthenticated) {
			checkViewBookingAuthorization(parseInt(bookingId))
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
				: <BookingConfirmation />
			}
			
		</div>
	);
}