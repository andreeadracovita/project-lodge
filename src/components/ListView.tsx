import classNames from "classnames";

import ListItem from "./ListItem";

function ListView({properties, cols}) {
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
		`row-cols-md-${cols}`
	);
	
	return (
		<div className="position-relative">
			<div className={gridClassNames}>
				{properties.map(p =>
					<div key={p.id} className="col">
						<ListItem
							isLink={true}
							id={p.id}
							img_url={propertyImgPathPrefix + p.img_url}
							title={p.title}
							city={p.city}
							country={p.country}
							price={p.price}
							rating={p.rating.toFixed(2)}
							checkIn={checkIn}
							checkOut={checkOut}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default ListView;