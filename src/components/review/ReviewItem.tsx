import { useEffect, useState } from "react";

import { getPropertyById, getUserNameAndAvatar } from "/src/api/BackendApiService";
import PropertyAvatar from "/src/components/common/PropertyAvatar";
import Rating from "/src/components/common/Rating";
import Avatar from "/src/components/user/Avatar";
import { yearDashMonthDashDay } from "/src/utils/DateFormatUtils";

export default function ReviewItem({ item, showUserAvatar, showPropertyAvatar }) {
	const [property, setProperty] = useState();
	const [user, setUser] = useState();

	useEffect(() => {
		getPropertyById(item.property_id)
			.then(response => {
				if (response.data.length === 1) {
					setProperty(response.data[0]);
				}
			})
			.catch(error => {
				console.error(error);
			});
		getUserNameAndAvatar(item.user_id)
			.then(response => {
				if (response.data) {
					setUser(response.data);
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
			<div className="mt-10 col">
				{ showPropertyAvatar && property && <div className="d-flex">
						<PropertyAvatar url={property.images_url_array[0]} size={32} />
						<div className="ms-2">
							<div className="text-strong">{property.title}</div>
							<div className="text-muted">Nationality</div>
						</div>
					</div>
				}
				{ showUserAvatar && user && <div className="d-flex">
						<Avatar url={user.img_url} size={32} firstName={user.first_name} />
						<div className="ms-2">
							<div className="text-strong">{user.first_name}</div>
							<div className="text-muted">Nationality</div>
						</div>
					</div>
				}
				<div>{yearDashMonthDashDay(new Date(item.created_at))}</div>
				<div><Rating score={item.rating} reviewsNo={item.reviews_no} /></div>
				<div>{item.title}</div>
				<div>{item.body}</div>
			</div>
		}
		</>
	);
}