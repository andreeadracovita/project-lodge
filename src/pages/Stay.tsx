import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import * as Icon from "react-bootstrap-icons";

import PropertyPhotoGrid from "../components/Stay/PropertyPhotoGrid";
import PropertyDescription from "../components/Stay/PropertyDescription";
import BookingCard from "../components/Stay/BookingCard";
import Rating from "../components/Rating";

function Stay() {
	// Todo: extract to config file
	const propertyImgPathPrefix = "/property_img/";

	const [searchParams, setSearchParams] = useSearchParams();
	const [property, setProperty] = useState();

	const id = searchParams.get("id");
	// DB query
	useEffect(() => {
		axios.get(`http://localhost:3000/properties/${id}`)
			.then(response => {
				if (response.data) {
					setProperty(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			})
	}, []);

	return (
		<>
			{
				property &&
				<div className="container">
					<div>
						<h1>{property.title}</h1>
						<p><Icon.GeoAltFill size={24}/> {property.street}, {property.street_no} {property.city}, {property.country}</p>
						<Rating score={property.rating} />
					</div>
					<div className="mt-3">
						<PropertyPhotoGrid urlArray={property.images_url_array.map(url => propertyImgPathPrefix + url)} />
					</div>
					<div className="mt-5 row">
						<div className="col-8">
							<PropertyDescription property={property} />
						</div>
						<div className="col-4">
							<BookingCard price={property.price} />
						</div>
					</div>
				</div>
			}
		</>
	);
}

export default Stay;