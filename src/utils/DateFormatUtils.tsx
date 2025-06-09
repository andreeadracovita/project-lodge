/**
 * Date formatting utils module for unitary display across app.
 */

// 2025-05-14
export function yearDashMonthDashDay(date) {
	return date.getFullYear().toString() + "-" +
			(date.getMonth() + 1).toString().padStart(2, '0') + "-" +
			date.getDate().toString().padStart(2, '0');
}

// 14 May 2025
export function dayMonYear(date) {
	const option = {
		month: "short",
		day: "numeric",
		year: "numeric"
	}
	return date.toLocaleString("en-GB", option);
}

export function getNightsCount(checkIn: Date, checkOut: Date) {
	const diffTime = checkOut - checkIn;
	const diffNights = Math.floor(diffTime / (1000 * 60 * 60 * 24));
	return diffNights;
}