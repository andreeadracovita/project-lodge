import { Link } from "react-router-dom";
import countries from "react-select-country-list";

import { fileStorage } from "utils/constants";

type DestinationItem = {
	country: string;
	url: string;
};

type DestinationListItemProps = {
	item: DestinationItem;
	checkIn?: string; // formatted string 2025-04-10
	checkOut?: string; // formatted string 2025-04-10
	guests?: number;
};

export default function DestinationListItem({ item, checkIn, checkOut, guests }: DestinationListItemProps) {

	const linkPath = {
		pathname: `/search-results`,
		search: `?country=${item.country}&check_in=${checkIn}&check_out=${checkOut}&guests=${guests}`
	};
	
	return (
		<Link to={linkPath}>
			<div className="mb-3">
					<div>
						<img src={fileStorage + item.url} className="list-item-photo mb-2" />
						<div>
							<p className="text-bold">{countries().getLabel(item.country)}</p>
						</div>
					</div>
				
			</div>
		</Link>
	);
}