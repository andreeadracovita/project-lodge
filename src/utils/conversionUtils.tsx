export function convertToPreferredCurrency(sitePrice, rate) {
	return Math.round(sitePrice * rate * 100) / 100;
}