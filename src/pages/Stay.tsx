import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { GeoAltFill } from "react-bootstrap-icons";
import countries from "react-select-country-list";

import { getPropertyById } from "api/BackendApiService";
import PropertyPhotoGrid from "components/stay/PropertyPhotoGrid";
import PropertyDescription from "components/stay/PropertyDescription";
import PropertyReviews from "components/stay/PropertyReviews";
import BookingCard from "components/stay/BookingCard";
import BookingSectionMobile from "components/stay/BookingSectionMobile";
import Rating from "components/common/Rating";
import { fileStorage } from "utils/constants";

export default function Stay() {
	const [searchParams] = useSearchParams();
	const [property, setProperty] = useState<any>();
	const navigate = useNavigate();

	const id = searchParams.get("id");

	useEffect(() => {
		if (!id) {
			navigate("/");
			return;
		}
		getPropertyById(parseInt(id))
			.then(response => {
				if (response.data) {
					setProperty(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			})
	}, []);

	function scrollToReviews() {
		const reviewsSectionElement = document.getElementById("reviews");
		reviewsSectionElement?.scrollIntoView();
	}

	return (
		<>
			{
				property &&
				<div>
					<div className="container section-container">
						<div>
							{
								!property.is_listed &&
								<div className="text-muted mb-2">
									UNPUBLISHED
								</div>
							}
							<h1 className="page-heading">{property.title}</h1>
							<p>
								<GeoAltFill size={24}/> {property.street}, {property.street_no} {property.city}, {countries().getLabel(property.country)}
							</p>
							<span className="cursor-pointer" onClick={scrollToReviews}>
								<Rating score={property.rating} reviewsNo={property.reviews_no} />
							</span>
						</div>
						<div className="mt-3">
							<PropertyPhotoGrid
								urlArray={property.images_url_array ? property.images_url_array.map((url: string) => fileStorage + url) : []}
							/>
						</div>
						<div className="mt-5 row">
							<div className="col-12 col-md-8">
								<PropertyDescription property={property} />
							</div>
							{
								property.is_listed &&
								<div className="d-none d-md-block col-4">
									<BookingCard price={property.price_night_site} maxGuests={property.guests} />
								</div>
							}
						</div>
						<hr />
						<PropertyReviews property={property} />
					</div>
					<BookingSectionMobile price={property.price_night_site} maxGuests={property.guests} />
				</div>
			}
		</>
	);
}
