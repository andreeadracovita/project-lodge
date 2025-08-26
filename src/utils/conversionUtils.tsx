export function convertToPreferredCurrency(sitePrice: number, rate: number) {
	return Math.round(sitePrice * rate * 100) / 100;
}