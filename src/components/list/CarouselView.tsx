import * as Icon from "react-bootstrap-icons";

import "./CarouselView.css";
import PropertyListItem from "./PropertyListItem";

export default function CarouselView({ items, checkIn, checkOut }) {
	
	return (
		<div id="carouselView" className="carousel slide">
			<div className="carousel-inner">
				<div className="carousel-item active">
					<div className="d-flex p-2">
					{
						items.slice(0, 4).map((item, i) =>
							<div key={i} className="col-3 pe-2">
								<PropertyListItem
									isPreview={false}
									item={item}
									guests={1}
									checkIn={checkIn}
									checkOut={checkOut}
									isCompact={true}
								/>
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
								<PropertyListItem
									isPreview={false}
									item={item}
									guests={1}
									checkIn={checkIn}
									checkOut={checkOut}
									isCompact={true}
								/>
							</div>
						)
					}
					</div>
				</div>
			</div>
			<button className="carousel-control-prev" type="button" data-bs-target="#carouselView" data-bs-slide="prev">
				<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button className="carousel-control-next" type="button" data-bs-target="#carouselView" data-bs-slide="next">
				<span className="carousel-control-next-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Next</span>
			</button>
		</div>
	);
}