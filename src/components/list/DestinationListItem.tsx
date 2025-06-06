import { Link } from "react-router-dom";

import { fileStorage } from "/src/utils/constants";

type DestinationItem = {
	city: string;
	country: string;
	url: string;
};

type DestinationListItemProps = {
	item: DestinationItem;
	checkIn: string;
	checkOut: string;
};

export default function DestinationListItem({ item, checkIn, checkOut }: DestinationListItemProps) {

	const linkPath = {
		pathname: `/search-results`,
		search: `?destination=${item.city}&check_in=${checkIn}&check_out=${checkOut}&guests=2`
	};
	
	return (
		<Link to={linkPath}>
			<div className="mb-3">
					<div>
						<img src={fileStorage + item.url} className="list-item-photo mb-2" />
						<div>
							<p className="lato-bold">{item.city}, {item.country}</p>
						</div>
					</div>
				
			</div>
		</Link>
	);
}