import classNames from "classnames";
import { Link } from "react-router-dom";

export enum HostingTab {
	Dashboard,
	Calendar,
	Properties,
	Messages
};

export default function HostingHeader({ current }) {
	function getClassNames(tab) {
		return classNames(
			"btn-pill-hover-only",
			{
				"me-4": tab !== HostingTab.Messages,
				"selected-tab": current === tab
			}
		);
	}
	
	return (
		<div className="d-flex justify-content-center">
			<Link to="/hosting" className={getClassNames(HostingTab.Dashboard)}>Dashboard</Link>
			<Link to="/hosting/calendar" className={getClassNames(HostingTab.Calendar)}>Calendar</Link>
			<Link to="/hosting/properties" className={getClassNames(HostingTab.Properties)}>Properties</Link>
			<Link to="/hosting/messages" className={getClassNames(HostingTab.Messages)}>Messages</Link>
		</div>
	);
}
