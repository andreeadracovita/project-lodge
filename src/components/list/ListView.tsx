import classNames from "classnames";

import PropertyListItem from "./PropertyListItem";

export enum ListItemType {
	Property = "property",
	Destination = "destination"
}

export default function ListView({listItemType, items, cols}) {
	// Today
	const checkIn = new Date();
	let checkOut = new Date();
	checkOut.setDate(checkOut.getDate() + 3);

	// Todo: extract to config file
	const propertyImgPathPrefix = "/property_img/";

	const gridClassNames = classNames(
		"row",
		"row-cols-1",
		"row-cols-sm-2",
		"row-cols-md-3",
		// "row-cols-lg-4",
		`row-cols-lg-${cols}`
	);
	
	return (
		<div className="position-relative">
			<div className={gridClassNames}>
				{items.map(item =>
					<div key={item.id} className="col">
						<PropertyListItem
							isLink={true}
							id={item.id}
							img_url={item.images_url_array.length > 0 ? propertyImgPathPrefix + item.images_url_array[0] : null}
							title={item.title+" very long title span"}
							city={item.city}
							country={item.country}
							price={item.price}
							rating={item.rating ? item.rating.toFixed(2) : ""}
							checkIn={checkIn}
							checkOut={checkOut}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
