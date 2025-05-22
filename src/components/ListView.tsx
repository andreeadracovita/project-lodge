import ListItem from "./ListItem";

function ListView({properties}) {
	// Today
	const checkIn = new Date();
	let checkOut = new Date();
	checkOut.setDate(checkOut.getDate() + 3);

	// Todo: extract to config file
	const propertyImgPathPrefix = "/property_img/";
	
	return (
		<div className="position-relative">
			<div className="row cols-1 cols-sm-2 cols-md-4">
				{properties.map(p =>
					<div key={p.id} className="col-12 col-sm-6 col-md-3">
						<ListItem
							isLink={true}
							id={p.id}
							img_url={propertyImgPathPrefix + p.img_url}
							title={p.title}
							city={p.city}
							country={p.country}
							price={p.price}
							currency={"currency"}
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