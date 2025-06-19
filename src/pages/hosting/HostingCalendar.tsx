import HostingHeader, { HostingTab } from "/src/components/hosting/HostingHeader";

export default function HostingCalendar() {
	return (
		<div className="container section-container">
			<HostingHeader current={HostingTab.Calendar} />
			
			<h1 className="page-heading">Calendar</h1>
		</div>
	);
}
