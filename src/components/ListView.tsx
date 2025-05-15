import ListItem from "./ListItem";
import properties from "../Properties.json";

function ListView() {
	// Today
	const checkIn = new Date();
	let checkOut = new Date();
	checkOut.setDate(checkOut.getDate() + 3);

	function getCity(location) {
		const city = "Zürich";
		return city;
	}

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
					<ListItem
						key={i}
						id={p.id}
						img_url={p.images_url_array[0]}
						title={p.title}
						city={getCity(p.location)}
						country={getCountry(p.location)}
						price={getPrice(p.id)}
						checkIn={checkIn}
						checkOut={checkOut}
					/>)}
			</div>
		</div>
	)
}

export default ListView;