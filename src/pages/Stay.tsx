import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import * as Icon from "react-bootstrap-icons";
import countries from "react-select-country-list";

import { getPropertyById } from "/src/api/BackendApiService";
import PropertyPhotoGrid from "/src/components/stay/PropertyPhotoGrid";
import PropertyDescription from "/src/components/stay/PropertyDescription";
import PropertyReviews from "/src/components/stay/PropertyReviews";
import BookingCard from "/src/components/stay/BookingCard";
import Rating from "/src/components/common/Rating";
import { fileStorage } from "/src/utils/constants";

export default function Stay() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [property, setProperty] = useState();

	const id = searchParams.get("id");

	useEffect(() => {
		getPropertyById(id)
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
				<div className="container section-container">
					<div>
						<h1 className="page-heading">{property.title}</h1>
						<p>
							<Icon.GeoAltFill size={24}/> {property.street}, {property.street_no} {property.city}, {countries().getLabel(property.country)}
						</p>
						<Rating score={property.rating} reviewsNo={property.reviews_no} />
					</div>
					<div className="mt-3">
						<PropertyPhotoGrid urlArray={property.images_url_array.map(url => fileStorage + url)} />
					</div>
					<div className="mt-5 row">
						<div className="col-8">
							<PropertyDescription property={property} />
						</div>
						<div className="col-4">
							<BookingCard price={property.price_night_site} />
						</div>
					</div>
					<hr />
					<PropertyReviews property={property} />
				</div>
			}
		</>
	);
}
