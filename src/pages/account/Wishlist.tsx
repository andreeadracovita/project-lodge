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
			{
				properties.length === 0
				? <div className="mt-10">You have no saved property yet.</div>
				: <>
					<div className="d-none d-md-block m-2 mt-10">
						{/*Desktop*/}
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
					<div className="d-block d-md-none m-2">
						{/*Mobile*/}
						<ListView
							listItemType={ListItemType.SmallProperty}
							items={properties}
							checkIn={checkInParam}
							checkOut={checkOutParam}
							nightsCount={nightsCount}
							cols={1}
							isCompact={false}
							guests={undefined}
							setNeedsRefresh={undefined}
						/>
					</div>
				</>
			}
		</div>
	);
}
