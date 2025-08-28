import { Link } from "react-router-dom";

import { fileStorage } from "utils/constants";
import { capitalizeFirstLetter } from "utils/stringUtils";

type PlaceTypeItemProps = {
	item: any;
	checkIn: string; // formatted string 2025-04-10
	checkOut: string; // formatted string 2025-04-10
	guests: number;
};

export default function PlaceTypeItem({ item, checkIn, checkOut, guests }: PlaceTypeItemProps) {
	const linkPath = {
		pathname: `/search-results`,
		search: `?check_in=${checkIn}&check_out=${checkOut}&guests=${guests}&ptype=${item.id}`
	};
	
	return (
		<Link to={linkPath}>
			<div className="mb-3">
					<div>
						<img src={fileStorage + item.img_url} className="list-item-photo mb-2" />
						<div>
							<p className="text-bold">{capitalizeFirstLetter(item.name)}</p>
						</div>
					</div>
				
			</div>
		</Link>
	);
}