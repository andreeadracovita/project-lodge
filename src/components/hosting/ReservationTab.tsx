import classNames from "classnames";

export enum ReservationsTab {
	Arriving,
	CheckingOut,
	Current,
	Upcoming
}

export default function ReservationTabItem({ tab, activeTab, itemsCount, setActiveTab }) {

	function handleTabClick() {
		setActiveTab(tab);
	}

	function getTabName() {
		switch (tab) {
			case ReservationsTab.Arriving: return `Arriving soon (${itemsCount})`;
			case ReservationsTab.CheckingOut: return `Checking out (${itemsCount})`;
			case ReservationsTab.Current: return `Currently hosting (${itemsCount})`;
			case ReservationsTab.Upcoming: return `Upcoming (${itemsCount})`;
			default: return "";
		}
	}

	function getTabClassName(tab) {
		return classNames(
			"features-list-item",
			"cursor-pointer",
			{
				"selected-tab": tab === activeTab
			}
		);
	}

	return (
		<span
			className={getTabClassName(tab)}
			onClick={() => handleTabClick(tab)}
		>
			{getTabName()}
		</span>
	);
}