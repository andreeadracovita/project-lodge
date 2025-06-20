import HostingCalendarMonth from "/src/components/hosting/HostingCalendarMonth";
import HostingCalendarSettings from "/src/components/hosting/HostingCalendarSettings";
import HostingHeader, { HostingTab } from "/src/components/hosting/HostingHeader";

export default function HostingCalendar() {
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth();
	const years = [currentYear - 1, currentYear, currentYear + 1];

	const months = [];
	for (let year = currentYear - 1; year < currentYear + 2; year++) {
		for (let m = 0; m < 12; m++) {
			months.push(<HostingCalendarMonth id={year*100+m} key={year*100+m} month={m} year={year} />)
		}
	}

	function focusMonth() {
		console.log("Focusing");
		const currentMonthElement = document.getElementById(`${currentYear*100+currentMonth}`);
		if (currentMonthElement) {
			currentMonthElement.scrollIntoView();
			console.log("Focused.");
		}
	}

	return (
		<div className="container section-container">
			<HostingHeader current={HostingTab.Calendar} />
			
			<div className="section-container">
				<div className="section-container row">
					<div className="col-3">
						<HostingCalendarSettings />
					</div>
					<div className="col-9">
						<div className="text-end">
							<span className="btn-pill-hover-only">Today</span>
							<span className="ms-2 btn-pill-hover-only">Month view</span>
						</div>

						<div id="calendar-sheet" className="mt-10">
							{months}
							{focusMonth()}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
