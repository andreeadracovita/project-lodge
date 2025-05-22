import ListItem from "./ListItem";

function ListView({properties}) {
	// Today
	const checkIn = new Date();
	let checkOut = new Date();
	checkOut.setDate(checkOut.getDate() + 3);

	// Include in REST API
	function getCity(location) {
		const city = "Zürich";
		return city;
	}

	// Include in REST API
	function getCountry(location) {
		const country = "Switzerland";
		return country;
	}

	function getPrice(property_id) {
		return 170;
	}
	
	return (
		<div className="position-relative">
			<div className="row cols-1 cols-sm-2 cols-md-4">
				{properties.map((p, i) =>
					<div className="col-12 col-sm-6 col-md-3">
						<ListItem
							key={i}
							isLink={true}
							id={p.id}
							img_url={p.images_url_array[0]}
							title={p.title}
							city={getCity(p.location)}
							country={getCountry(p.location)}
							price={getPrice(p.id)}
							currency={"currency"}
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