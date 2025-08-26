import classNames from "classnames";

import BookingListItem from "./BookingListItem";
import DestinationListItem from "./DestinationListItem";
import HostingPropertyListItem from "./HostingPropertyListItem";
import { ListItemType } from "./ListItemType";
import PropertyListItem from "./PropertyListItem";
import SmallPropertyListItem from "./SmallPropertyListItem";
import { yearDashMonthDashDay } from "utils/dateUtils";

export default function ListView({ listItemType, items, checkIn, checkOut, nightsCount, guests, cols, setNeedsRefresh, isCompact }) {

	const gridClassNames = classNames(
		"row",
		"g-2",
		`row-cols-1`,
		`row-cols-sm-1`,
		`row-cols-md-${cols - 1}`,
		`row-cols-lg-${cols}`
	);

	const destinationGridClassNames = classNames(
		"row",
		`row-cols-${cols}`
	);

	function renderItemByType(item) {
		switch (listItemType) {
			case ListItemType.Property:
				return <PropertyListItem
					isPreview={false}
					item={item}
					checkIn={checkIn}
					checkOut={checkOut}
					guests={guests}
					nightsCount={nightsCount}
					isCompact={isCompact}
				/>;
			case ListItemType.Destination:
				return <DestinationListItem
					item={item}
					checkIn={checkIn}
					checkOut={checkOut}
					guests={guests}
				/>;
			case ListItemType.HostingProperty:
				return <HostingPropertyListItem item={item} setNeedsRefresh={setNeedsRefresh} />;
			case ListItemType.Booking:
				return <BookingListItem item={item} />
			case ListItemType.SmallProperty:
				return <SmallPropertyListItem
					item={item}
					checkIn={checkIn}
					checkOut={checkOut}
					guests={guests}
					nightsCount={nightsCount}
				/>;
			default: return;
		}
	}
	
	return (
		<div className={ listItemType !== ListItemType.Destination ? gridClassNames : destinationGridClassNames }>
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
