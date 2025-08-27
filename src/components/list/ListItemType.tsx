export const ListItemType = {
	Property: "Property",
	Destination: "Destination",
	HostingProperty: "HostingProperty",
	Booking: "Booking",
	PlaceType: "PlaceType",
	SmallProperty: "SmallProperty"
} as const;
export type ListItemType = (typeof ListItemType)[keyof typeof ListItemType];