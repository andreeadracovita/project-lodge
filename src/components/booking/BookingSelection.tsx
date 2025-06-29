import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { getPropertyById } from "/src/api/BackendApiService";
import BookingPropertySection from "/src/components/booking/BookingPropertySection";
import BookingDetailSection from "/src/components/booking/BookingDetailSection";
import BookingPriceSection from "/src/components/booking/BookingPriceSection";

export default function BookingSelection() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [property, setProperty] = useState();
	const propertyId = searchParams.get("id");

	useEffect(() => {
		getPropertyById(propertyId)
			.then(response => {
				if (response.data) {
					setProperty(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);
	
	return (
		<>
			{
				property &&
				<div>
					<BookingPropertySection item={property} />
					<div className="mt-3">
						<BookingDetailSection item={property} />
					</div>
					<div className="mt-3">
						<BookingPriceSection item={property} />
					</div>
				</div>
			}
		</>
	)
}