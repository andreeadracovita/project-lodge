import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { getAllBuildingTypes, getAllRentalTypes } from "/src/api/BackendApiService";
import { weekdayMonYear, getNightsCount } from "/src/utils/DateFormatUtils";

export default function BookingDetailSection({ item }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const checkInDate = new Date(searchParams.get("check_in"));
	const checkOutDate = new Date(searchParams.get("check_out"));
	const nightsCount = getNightsCount(checkInDate, checkOutDate);
	const guestsNo = searchParams.get("guests");

	const [rentalTypes, setRentalTypes] = useState([]);
	const [propertyTypes, setPropertyTypes] = useState([]);

	useEffect(() => {
		getAllBuildingTypes()
			.then(response => {
				if (response.data.length > 0) {
					setPropertyTypes(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			});

		getAllRentalTypes()
			.then(response => {
				if (response.data.length > 0) {
					setRentalTypes(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	function getBookedProperty(): string {
		const currentRentalType = rentalTypes.find(type => type.id === item.rental_type_id);
		if (currentRentalType?.name === "room") {
			return "room";
		}
		const currentPropertyType = propertyTypes.find(type => type.id === item.building_type_id);
		if (currentPropertyType) {
			return currentPropertyType.name;
		}
		return "???";
	}
	
	return (
		<div className="border-section">
			<h2 className="property-card-heading">Your booking details</h2>
			<div className="mt-10 d-flex justify-content-between">
				<div>
					<div>Check-in</div>
					<div className="text-strong property-card-heading">{ weekdayMonYear(checkInDate) }</div>
					<div className="text-muted">15:00 — 20:00</div>
				</div>
				<div className="vr"></div>
				<div>
					<div>Check-out</div>
					<div className="text-strong property-card-heading">{ weekdayMonYear(checkOutDate) }</div>
					<div className="text-muted">06:00 — 10:00</div>
				</div>
			</div>
			<div className="mt-6">Total length of stay:</div>
			<div className="text-strong property-card-heading">{nightsCount} {nightsCount > 1 ? <span>nights</span> : <span>night</span>}</div>
			<hr />
			<div>You selected</div>
			<div className="text-strong">1 { getBookedProperty() } for { guestsNo } { guestsNo > 1 ? <span>guests</span> : <span>guest</span> }</div>
		</div>
	);
}