/**
 * Date formatting utils module for unitary display across app.
 */

function yearDashMonthDashDay(date) {
	return date.getFullYear().toString() + "-" +
			(date.getMonth() + 1).toString().padStart(2, '0') + "-" +
			date.getDate().toString().padStart(2, '0');
}

export { yearDashMonthDashDay };