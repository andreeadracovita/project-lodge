import { useSearchParams } from "react-router";
import * as Icon from "react-bootstrap-icons";

import PropertyPhotoGrid from "../components/Stay/PropertyPhotoGrid";
import PropertyDescription from "../components/Stay/PropertyDescription";
import BookingCard from "../components/Stay/BookingCard";
import Rating from "../components/Rating";
import properties from "../Properties.json";

function Stay() {
	const [searchParams, setSearchParams] = useSearchParams();

	const id = searchParams.get("id");
	// DB query
	const item = properties.find(p => p.id == id);

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

	return (
		<div className="container">
			<div>
				<p className="page-title">{item.title}</p>
				<p><Icon.GeoAltFill size={24}/> [Address from Geo Api], {getCity(item.location)}, {getCountry(item.location)}</p>
				<Rating score={4.95} />
			</div>
			<div className="mt-3">
				<PropertyPhotoGrid urlArray={item.images_url_array} />
			</div>
			<div className="mt-3 row">
				<div className="col-8">
					<PropertyDescription property={item} />
				</div>
				<div className="col-4">
					<BookingCard price={170} />
				</div>
			</div>
			
		</div>
	);
}

export default Stay;