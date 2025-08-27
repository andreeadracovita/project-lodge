import { useEffect, useState } from "react";

import { getAllBookings } from "api/BackendApiService";
import ListView from "components/list/ListView";
import { ListItemType } from "components/list/ListItemType";
import CallToTravel from "components/trips/CallToTravel";
import CurrentTrip from "components/trips/CurrentTrip";

/**
 * Trips are displayed in 3 sections:
 * - Current: if any
 * - Upcoming: asc order by check-in
 * - Completed: desc order by check-in
 */
export default function Trips() {
	const [currentBookings, setCurrentBookings] = useState([]);
	const [upcomingBookings, setUpcomingBookings] = useState([]);
	const [completedBookings, setCompletedBookings] = useState([]);
	const [cancelledBookings, setCancelledBookings] = useState([]);

	useEffect(() => {
		getAllBookings()
			.then(response => {
				setCurrentBookings(response.data.current);
				setUpcomingBookings(response.data.upcoming);
				setCompletedBookings(response.data.completed);
				setCancelledBookings(response.data.cancelled);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	return (
		<div className="container section-container">
			<h1 className="page-heading">Trips</h1>
			
			{
				(currentBookings.length === 0 && upcomingBookings.length === 0) &&
				<div className="mt-10">
					<CallToTravel />
				</div>
			}

			{
				currentBookings.length > 0 && 
				<div className="mt-10">
					<CurrentTrip item={currentBookings[0]} />
				</div>
			}
			
			{
				currentBookings.length > 1 && 
				<div className="mt-10">
					<ListView
						listItemType={ListItemType.Booking}
						items={currentBookings.slice(1)}
						cols={3}
						checkIn={undefined}
						checkOut={undefined}
						nightsCount={undefined}
						guests={undefined}
						isCompact={undefined}
						setNeedsRefresh={undefined}
					/>
				</div>
			}

			{
				upcomingBookings.length > 0 &&
				<div className="section-container">
					<h2 className="section-heading">Upcoming trips</h2>
					<ListView
						listItemType={ListItemType.Booking}
						items={upcomingBookings}
						cols={3}
						checkIn={undefined}
						checkOut={undefined}
						nightsCount={undefined}
						guests={undefined}
						isCompact={undefined}
						setNeedsRefresh={undefined}
					/>
				</div>
			}


			{
				completedBookings.length > 0 &&
				<div className="section-container">
					<h2 className="section-heading">Completed trips</h2>
					<ListView
						listItemType={ListItemType.Booking}
						items={completedBookings}
						cols={3}
						checkIn={undefined}
						checkOut={undefined}
						nightsCount={undefined}
						guests={undefined}
						isCompact={undefined}
						setNeedsRefresh={undefined}
					/>
				</div>
			}

			{
				cancelledBookings.length > 0 &&
				<div className="section-container">
					<h2 className="section-heading">Cancelled trips</h2>
					<ListView
						listItemType={ListItemType.Booking}
						items={cancelledBookings}
						cols={3}
						checkIn={undefined}
						checkOut={undefined}
						nightsCount={undefined}
						guests={undefined}
						isCompact={undefined}
						setNeedsRefresh={undefined}
					/>
				</div>
			}
		</div>
	);
}
