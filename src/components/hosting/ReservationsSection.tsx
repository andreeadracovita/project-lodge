import * as Icon from "react-bootstrap-icons";

import "./ReservationsSection.css";
import { ReservationsTab } from "/src/components/hosting/ReservationTab";
import ReservationItem from "/src/components/hosting/ReservationItem";

export default function ReservationsSection({ tab, items }) {
	
	function getFreeMessage() {
		if (items.length === 0) {
			switch (tab) {
				case ReservationsTab.Arriving: return "You don't have any guests arriving today or tomorrow";
				case ReservationsTab.CheckingOut: return "You don't have any guests checking out today or tomorrow";
				case ReservationsTab.Current: return "You don't have any current guests";
				case ReservationsTab.Upcoming: return "You don't have any upcoming guests";
				default: return "";
			}
		}
	}
	
	return (
		<>
			{
				items.length === 0 &&
				<div className="d-flex flex-wrap justify-content-center">
					<Icon.JournalCheck size={28} className="w-100" />
					<div id="free-message" className="mt-10 text-center">{getFreeMessage()}</div>
				</div>
			}
			{
				items.length > 0 &&
				<div className="row row-cols-4">
					{
						items.map((item, i) => {
							return <ReservationItem key={i} item={item} />
						})
					}
				</div>
			}
		</>
	);
}