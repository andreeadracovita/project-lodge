import { Link } from "react-router-dom";
import countries from "react-select-country-list";

import { fileStorage } from "/src/utils/constants";

type PlaceType = {
	// city: string;
	name: string;
	url: string;
};

type PlaceTypeItemProps = {
	item: PlaceType;
	checkIn: string; // formatted string 2025-04-10
	checkOut: string; // formatted string 2025-04-10
};

export default function PlaceTypeItem({ item, checkIn, checkOut }: PlaceTypeItemProps) {

	const linkPath = {
		pathname: `/search-results`,
		search: `?check_in=${checkIn}&check_out=${checkOut}&guests=2&type=${item.name.toLowerCase()}`
	};
	
	return (
		<Link to={linkPath}>
			<div className="mb-3">
					<div>
						<img src={fileStorage + item.url} className="list-item-photo mb-2" />
						<div>
							<p className="lato-bold">{item.name}</p>
						</div>
					</div>
				
			</div>
		</Link>
	);
}