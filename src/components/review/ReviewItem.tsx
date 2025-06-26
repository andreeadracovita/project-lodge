import { useEffect, useState } from "react";

import { getPropertyById } from "/src/api/BackendApiService";
import PropertyAvatar from "/src/components/common/PropertyAvatar";
import Rating from "/src/components/common/Rating";
import { yearDashMonthDashDay } from "/src/utils/DateFormatUtils";

export default function ReviewItem({ item, showUserAvatar, showPropertyAvatar }) {
	const [property, setProperty] = useState();

	useEffect(() => {
		getPropertyById(item.property_id)
			.then(response => {
				if (response.data.length === 1) {
					setProperty(response.data[0]);
				}
			})
	}, []);
	
	return (
		<>
		{
			property &&
			<div className="mt-10 col">
				<div className="text-strong">{property.title}</div>
				{ showPropertyAvatar && <PropertyAvatar url={property.images_url_array[0]} size={70} /> }
				{ showUserAvatar && <>User avatar</> }
				<div>{yearDashMonthDashDay(new Date(item.created_at))}</div>
				<div><Rating score={item.rating} /></div>
				<div>{item.title}</div>
				<div>{item.body}</div>
			</div>
		}
		</>
	);
}