import HostingHeader, { HostingTab } from "/src/components/hosting/HostingHeader";
import { useAuth } from "/src/components/security/AuthContext";

export default function HostingDashboard() {
	const authContext = useAuth();

	return (
		<div className="container section-container">
			<HostingHeader current={HostingTab.Dashboard} />

			<h1 className="page-heading">Welcome, {authContext.firstName}!</h1>
		</div>
	);
}
