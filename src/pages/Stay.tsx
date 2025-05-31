import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import * as Icon from "react-bootstrap-icons";

import { getPropertyById } from "/src/components/api/LodgeDbApiService";
import PropertyPhotoGrid from "/src/components/Stay/PropertyPhotoGrid";
import PropertyDescription from "/src/components/Stay/PropertyDescription";
import BookingCard from "/src/components/Stay/BookingCard";
import Rating from "/src/components/Rating";
import { propertyPhotoPrefix } from "/src/constants";

export default function Stay() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [property, setProperty] = useState();

	const id = searchParams.get("id");

	useEffect(() => {
		getPropertyById(id)
			.then(response => {
				if (response.data?.length > 0) {
					setProperty(response.data[0]);
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
				<div className="container section-container">
					<div>
						<h1 className="page-heading">{property.title}</h1>
						<p><Icon.GeoAltFill size={24}/> {property.street}, {property.street_no} {property.city}, {property.country}</p>
						<Rating score={property.rating} />
					</div>
					<div className="mt-3">
						<PropertyPhotoGrid urlArray={property.images_url_array.map(url => propertyPhotoPrefix + url)} />
					</div>
					<div className="mt-5 row">
						<div className="col-8">
							<PropertyDescription property={property} />
						</div>
						<div className="col-4">
							<BookingCard price={property.price_per_night_eur} />
						</div>
					</div>
				</div>
			}
		</>
	);
}
