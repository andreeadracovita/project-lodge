import HostingHeader, { HostingTab } from "/src/components/hosting/HostingHeader";
import HostingCalendarSettings from "/src/components/hosting/HostingCalendarSettings";
import HostingCalendarView from "/src/components/hosting/HostingCalendarView";

export default function HostingCalendar() {

	return (
		<div className="container section-container">
			<HostingHeader current={HostingTab.Calendar} />
			
			<div className="section-container">
				<div className="section-container row">
					<div className="col-3">
						<HostingCalendarSettings />
					</div>
					<div className="col-9">
						<HostingCalendarView />
					</div>
				</div>
			</div>
		</div>
	);
}
