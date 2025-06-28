import classNames from "classnames";

import DestinationListItem from "./DestinationListItem";
import HostingPropertyListItem from "./HostingPropertyListItem";
import PropertyListItem from "./PropertyListItem";
import BookingListItem from "./BookingListItem";
import { yearDashMonthDashDay } from "/src/utils/DateFormatUtils";

export enum ListItemType {
	Property,
	Destination,
	HostingProperty,
	Booking
};

export default function ListView({ listItemType, items, cols, setNeedsRefresh, isCompact }) {
	// Today
	// TODO: replace with first weekend
	// TODO: [checkIn, out, guests] need to be props for ListView. Parent component establishes values.
	const checkIn = new Date();
	let checkOut = new Date();
	checkOut.setDate(checkOut.getDate() + 2);
	const guests = 1;

	const gridClassNames = classNames(
		"row",
		"g-4",
		"row-cols-1",
		"row-cols-sm-2",
		"row-cols-md-3",
		`row-cols-lg-${cols}`
	);
	
	return (
		<div className={gridClassNames}>
			{
				listItemType === ListItemType.Property &&
				<>
					{
						items.map((item, i) =>
							<div key={i} className="col">
								<PropertyListItem
									isPreview={false}
									item={item}
									guests={guests}
									checkIn={checkIn}
									checkOut={checkOut}
									isCompact={isCompact}
								/>
							</div>
						)
					}
				</>
			}
			{
				listItemType === ListItemType.Destination &&
				<>
					{
						items.map((item, i) =>
							<div key={i} className="col">
								<DestinationListItem
									item={item}
									checkIn={yearDashMonthDashDay(checkIn)}
									checkOut={yearDashMonthDashDay(checkOut)} />
							</div>
						)
					}
				</>
			}
			{
				listItemType === ListItemType.HostingProperty &&
				<>
					{
						items.map((item, i) =>
							<div key={i} className="col">
								<HostingPropertyListItem item={item} setNeedsRefresh={setNeedsRefresh} />
							</div>
						)
					}
				</>
			}
			{
				listItemType === ListItemType.Booking &&
				<>
					{
						items.map((item, i) =>
							<div key={i} className="col">
								<BookingListItem item={item} />
							</div>
						)
					}
				</>
			}
		</div>
	)
}
