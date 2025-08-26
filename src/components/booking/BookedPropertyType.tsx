import { useEffect, useState } from "react";

import { getAllPropertyTypes, getAllRentalTypes } from "api/BackendApiService";

export default function BookedPropertyType({ rentalTypeId, buildingTypeId }) {
	const [rentalTypes, setRentalTypes] = useState([]);
	const [propertyTypes, setPropertyTypes] = useState([]);

	useEffect(() => {
		getAllPropertyTypes()
			.then(response => {
				setPropertyTypes(response.data);
			})
			.catch(error => {
				console.error(error);
			});
		getAllRentalTypes()
			.then(response => {
				setRentalTypes(response.data);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	function getBookedProperty(): string {
		const currentRentalType = rentalTypes.find(type => type.id === rentalTypeId);
		if (currentRentalType?.name === "room") {
			return "room";
		}
		const currentPropertyType = propertyTypes.find(type => type.id === buildingTypeId);
		if (currentPropertyType) {
			return currentPropertyType.name;
		}
		return "???";
	}

	return (
		<span>
			1 {getBookedProperty()}
		</span>
	)
}