/**
 * Booking utils module for booking API interaction.
 */

// Check-in - check-out pairs, check-out day is available for booking
const bookedDates = [
	[new Date(2025, 4, 1), new Date(2025, 4, 3)],
	[new Date(2025, 4, 22), new Date(2025, 4, 25)],
	[new Date(2025, 5, 9), new Date(2025, 5, 11)]
];

function isDateAvailable(date) {
	// DB query only current month of the date, cache result for similar queries, renew cached when needed.
	for (const booked of bookedDates) {
		if (date >= booked[0] && date < booked[1]) {
			return false;
		}
	}
	return true;
}

export { isDateAvailable };