import classNames from "classnames";

export const ReservationsTab = {
	Arriving: "Arriving",
	CheckingOut: "CheckingOut",
	Current: "Current",
	Upcoming: "Upcoming"
} as const;
export type ReservationsTab = (typeof ReservationsTab)[keyof typeof ReservationsTab];

type ReservationTabItemProps = {
	tab: ReservationsTab;
	activeTab: ReservationsTab;
	itemsCount: number;
	setActiveTab: any;
};

export default function ReservationTabItem({ tab, activeTab, itemsCount, setActiveTab }: ReservationTabItemProps) {

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

	function getTabClassName() {
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
			className={getTabClassName()}
			onClick={() => handleTabClick()}
		>
			{getTabName()}
		</span>
	);
}