/**
 * Date formatting utils module for unitary display across app.
 */

// 2025-05-14
export function yearDashMonthDashDay(date: Date) {
	return date.getFullYear().toString() + "-" +
			(date.getMonth() + 1).toString().padStart(2, '0') + "-" +
			date.getDate().toString().padStart(2, '0');
}

// 14 Feb 2025
export function dayMonYear(date: Date) {
	return date.toLocaleString("en-GB", {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}

// Wed 14 Feb 2025
export function weekdayMonYear(date: Date) {
	return date.toLocaleString("en-GB", {
		weekday: "short",
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}

export function getNightsCount(checkIn: any, checkOut: any) {
	const diffTime = checkOut - checkIn;
	const diffNights = Math.floor(diffTime / (1000 * 60 * 60 * 24));
	return diffNights;
}

// Compares date1 to date2. If date1 > date2 return 1, if date1 < date2 return -1, if === return 0.
export function compareDates(date1: Date, date2: Date): number {
	const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
	const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
	return utc1 > utc2 ? 1 : (utc1 < utc2 ? -1 : 0);
}