import HostingHeader, { HostingTab } from "/src/components/hosting/HostingHeader";

export default function HostingMessages() {
	return (
		<div className="container section-container">
			<HostingHeader current={HostingTab.Messages} />
			
			<div className="section-container">
				<h1 className="page-heading">Hosting messages</h1>
			</div>
		</div>
	);
}