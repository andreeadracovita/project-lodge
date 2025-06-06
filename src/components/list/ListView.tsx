import classNames from "classnames";

import DestinationListItem from "./DestinationListItem";
import HostingPropertyListItem from "./HostingPropertyListItem";
import PropertyListItem from "./PropertyListItem";
import { yearDashMonthDashDay } from "/src/utils/DateFormatUtils";

export enum ListItemType {
	Property,
	Destination,
	HostingProperty
}

export default function ListView({ listItemType, items, cols, setNeedsRefresh }) {
	// Today
	// TODO: replace with first weekend
	const checkIn = new Date();
	let checkOut = new Date();
	checkOut.setDate(checkOut.getDate() + 3);

	const gridClassNames = classNames(
		"row",
		"g-4",
		"row-cols-1",
		"row-cols-sm-2",
		"row-cols-md-3",
		// "row-cols-lg-4",
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
									isLink={true}
									item={item}
									checkIn={checkIn}
									checkOut={checkOut}
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
		</div>
	)
}
