import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

import "./CarouselView.css";
import PlaceTypeItem from "./PlaceTypeItem";
import PropertyListItem from "./PropertyListItem";
import { ListItemType } from "components/list/ListItemType";

type CarouselViewProps = {
	id: string;
	listItemType: ListItemType;
	items: any[];
	checkIn: string; // formatted string 2025-04-10
	checkOut: string; // formatted string 2025-04-10
	nightsCount: number;
	guests: number;
};

export default function CarouselView({ id, listItemType, items, checkIn, checkOut, nightsCount, guests }: CarouselViewProps) {

	function renderItemByType(item: any) {
		switch (listItemType) {
			case ListItemType.Property:
				return <PropertyListItem
					item={item}
					checkIn={checkIn}
					checkOut={checkOut}
					guests={guests}
					nightsCount={nightsCount}
					isCompact={true}
					hideWishlist={false}
					isPreview={false}
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
						items.slice(0, 4).map((item: any, i: number) =>
							<div key={i} className="col-3 pe-2">
								{ renderItemByType(item) }
							</div>
						)
					}
					</div>
				</div>
				{
					items.length > 4 &&
					<div className="carousel-item">
						<div className="d-flex p-2">
						{
							items.slice(4, 8).map((item: any, i: number) =>
								<div key={i} className="col-3 pe-2">
									{ renderItemByType(item) }
								</div>
							)
						}
						</div>
					</div>
				}
			</div>
			{
				items.length > 4 &&
				<>
					<button
						className="btn-round position-absolute top-50 start-0 translate-middle-y"
						aria-hidden="true"
						type="button"
						data-bs-target={`#${id}`}
						data-bs-slide="prev"
					>
						<ChevronLeft size={24} color="white" />
					</button>
					<button
						className="btn-round position-absolute top-50 end-0 translate-middle-y"
						aria-hidden="true"
						type="button"
						data-bs-target={`#${id}`}
						data-bs-slide="next"
					>
						<ChevronRight size={24} color="white" />
					</button>
				</>
			}
		</div>
	);
}