import { useEffect, useState } from "react";

import { getAllWishlisted } from "api/BackendApiService";
import ListView from "components/list/ListView";
import { ListItemType } from "components/list/ListItemType";
import { yearDashMonthDashDay, getNightsCount } from "utils/dateUtils";

export default function Wishlist() {
	const [properties, setProperties] = useState([]);
	const checkIn = new Date();
	let checkOut = new Date();
	checkOut.setDate(checkOut.getDate() + 1);

	const checkInParam = yearDashMonthDashDay(checkIn);
	const checkOutParam = yearDashMonthDashDay(checkOut);
	const nightsCount = getNightsCount(checkIn, checkOut);

	useEffect(() => {
		getAllWishlisted()
			.then(response => {
				if (response.data.length > 0) {
					setProperties(response.data); 
				}
			})
			.catch(error => {
				console.error(error);
			})
	}, []);

	return (
		<div className="container section-container">
			<h1 className="page-heading">Wishlist</h1>
			<ListView
				listItemType={ListItemType.Property}
				items={properties}
				checkIn={checkInParam}
				checkOut={checkOutParam}
				nightsCount={nightsCount}
				cols={4}
				isCompact={true}
				guests={undefined}
				setNeedsRefresh={undefined}
			/>
		</div>
	);
}
