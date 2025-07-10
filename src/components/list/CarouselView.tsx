import * as Icon from "react-bootstrap-icons";

import "./CarouselView.css";
import PlaceTypeItem from "./PlaceTypeItem";
import PropertyListItem from "./PropertyListItem";
import { ListItemType } from "/src/components/list/ListItemType";

type CarouselViewProps = {
	id: number;
	listItemType: ListItemType;
	items: Array;
	checkIn: string; // formatted string 2025-04-10
	checkOut: string; // formatted string 2025-04-10
	guests: number;
};

export default function CarouselView({ id, listItemType, items, checkIn, checkOut, nightsCount, guests }: CarouselViewProps) {

	function renderItemByType(item) {
		switch (listItemType) {
			case ListItemType.Property:
				return <PropertyListItem
					isPreview={false}
					item={item}
					checkIn={checkIn}
					checkOut={checkOut}
					guests={guests}
					nightsCount={nightsCount}
					isCompact={true}
				/>;
			case ListItemType.PlaceType:
				return <PlaceTypeItem
					item={item}
					checkIn={checkIn}
					checkOut={checkOut}
					guests={guests}
				/>;
			default: return;
		}
	}
	
	return (
		<div id={id} className="carousel slide">
			<div className="carousel-inner">
				<div className="carousel-item active">
					<div className="d-flex p-2">
					{
						items.slice(0, 4).map((item, i) =>
							<div key={i} className="col-3 pe-2">
								{ renderItemByType(item) }
							</div>
						)
					}
					</div>
				</div>
				<div className="carousel-item">
					<div className="d-flex p-2">
					{
						items.slice(4, 8).map((item, i) =>
							<div key={i} className="col-3 pe-2">
								{ renderItemByType(item) }
							</div>
						)
					}
					</div>
				</div>
			</div>
			<button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
				<div className="btn-round" aria-hidden="true"><Icon.ChevronLeft size={24} /></div>
			</button>
			<button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
				<div className="btn-round" aria-hidden="true"><Icon.ChevronRight size={24} /></div>
			</button>
		</div>
	);
}