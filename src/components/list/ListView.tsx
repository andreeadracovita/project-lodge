import classNames from "classnames";

import DestinationListItem from "./DestinationListItem";
import HostingPropertyListItem from "./HostingPropertyListItem";
import { ListItemType } from "./ListItemType";
import PropertyListItem from "./PropertyListItem";
import BookingListItem from "./BookingListItem";
import { yearDashMonthDashDay } from "/src/utils/DateFormatUtils";

export default function ListView({ listItemType, items, checkIn, checkOut, guests, cols, setNeedsRefresh, isCompact }) {

	const gridClassNames = classNames(
		"row",
		"g-4",
		"row-cols-1",
		"row-cols-sm-2",
		"row-cols-md-3",
		`row-cols-lg-${cols}`
	);

	function renderItemByType(item) {
		switch (listItemType) {
			case ListItemType.Property:
				return <PropertyListItem
					isPreview={false}
					item={item}
					guests={guests}
					checkIn={checkIn}
					checkOut={checkOut}
					isCompact={isCompact}
				/>;
			case ListItemType.Destination:
				return <DestinationListItem
					item={item}
					checkIn={yearDashMonthDashDay(checkIn)}
					checkOut={yearDashMonthDashDay(checkOut)}
				/>;
			case ListItemType.HostingProperty:
				return <HostingPropertyListItem item={item} setNeedsRefresh={setNeedsRefresh} />;
			case ListItemType.Booking:
				return <BookingListItem item={item} />
			default: return;
		}
	}
	
	return (
		<div className={gridClassNames}>
		{
			items.map((item, i) =>
				<div key={i} className="col">
					{ renderItemByType(item) }
				</div>
			)
		}
		</div>
	)
}
