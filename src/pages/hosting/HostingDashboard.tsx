import { useEffect, useState } from "react";

import HostingHeader, { HostingTab } from "components/hosting/HostingHeader";
import ReservationsSection from "components/hosting/ReservationsSection";
import { getPartitionedBookings } from "api/BackendApiService";
import ReservationTabItem, { ReservationsTab } from "components/hosting/ReservationTab";
import { useAuth } from "components/security/AuthContext";

export default function HostingDashboard() {
	const authContext: any = useAuth();

	const tabs = [ReservationsTab.CheckingOut, ReservationsTab.Current, ReservationsTab.Arriving, ReservationsTab.Upcoming];
	const [activeTab, setActiveTab] = useState<ReservationsTab>(ReservationsTab.CheckingOut);

	const [checkingOut, setCheckingOut] = useState([]);
	const [current, setCurrent] = useState([]);
	const [arriving, setArriving] = useState([]);
	const [upcoming, setUpcoming] = useState([]);

	useEffect(() => {
		getPartitionedBookings()
			.then(response => {
				const data = response.data;
				setArriving(data.arriving);
				setCheckingOut(data.checkingOut);
				setCurrent(data.current);
				setUpcoming(data.upcoming);
			})
			.catch(error => {
				console.error(error);
			})
	}, []);

	function getActiveTabItems() {
		switch (activeTab) {
			case ReservationsTab.Arriving: return arriving;
			case ReservationsTab.CheckingOut: return checkingOut;
			case ReservationsTab.Current: return current;
			case ReservationsTab.Upcoming: return upcoming;
			default: return [];
		}
	}

	function getItemsCount(tab: ReservationsTab): number {
		switch (tab) {
			case ReservationsTab.Arriving: return arriving.length;
			case ReservationsTab.CheckingOut: return checkingOut.length;
			case ReservationsTab.Current: return current.length;
			case ReservationsTab.Upcoming: return upcoming.length;
			default: return 0;
		}
	}

	return (
		<div className="container section-container">
			<HostingHeader current={HostingTab.Dashboard} />

			<div className="section-container">
				<h1 className="page-heading">Welcome, {authContext.firstName}!</h1>
				<h2 className="section-container section-heading">Your reservations</h2>
				<div id="reservations-tabs" className="mt-10">
					{
						tabs.map((tab: ReservationsTab, i: number) =>
							<ReservationTabItem
								key={i}
								tab={tab}
								activeTab={activeTab}
								setActiveTab={setActiveTab}
								itemsCount={getItemsCount(tab)} />
						)
					}
				</div>
				<div id="reservations-section" className="section-container">
					<ReservationsSection tab={activeTab} items={getActiveTabItems()} />
				</div>
			</div>
		</div>
	);
}
