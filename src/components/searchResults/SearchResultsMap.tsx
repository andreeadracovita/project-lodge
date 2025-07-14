import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import * as Icon from "react-bootstrap-icons";
import countries from "react-select-country-list";

import { getGeolocation } from "/src/api/BackendApiService";
import ListView from "/src/components/list/ListView";
import { ListItemType } from "/src/components/list/ListItemType";
import MapView from "/src/components/map/MapView";
import { genericMapCenter } from "/src/utils/constants";

export default function SearchResultsMap({ items, checkInParam, checkOutParam, guests, nightsCount }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [locationGeo, setLocationGeo] = useState(genericMapCenter);
	const [points, setPoints] = useState([]);

	useEffect(() => {
		const countryCode = searchParams.get("country");
		if (!countryCode) {
			setLocationGeo(genericMapCenter);
			return;
		}
		
		const countryFull = countries().getLabel(countryCode);
		const city = searchParams.get("city");

		const address = city ? city + "+" + countryFull : countryFull;
		getGeolocation(address)
			.then(response => {
				if (response.data.length > 0) {
					const data = response.data[0];
					setLocationGeo([Number(data.lat), Number(data.lon)]);
					console.log([Number(data.lat), Number(data.lon)]);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, [searchParams.get("country"), searchParams.get("city")]);

	useEffect(() => {
		if (!items || items.length === 0) {
			return;
		}
		const points = [];
		items.map(p => {
			points.push([p.geo.x, p.geo.y]);
		});
		setPoints(points);
	}, [items]);
	
	return (
		<div className="position-relative">
			<MapView id={"mini-map"} height={"200px"} center={locationGeo} zoom={6} points={[]} isEditable={false} />
			<span className="btn btn-dark rounded-pill position-absolute top-50 start-50 translate-middle d-flex align-items-center">
				<div className="me-2 d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#mapModal">
					<span className="me-1">Show map</span><Icon.Map color="white" />
				</div>
				
			</span>
			<div id="mapModal" className="modal fade w-100" tabIndex="-1" aria-labelledby="mapModalLabel" aria-hidden="true">
				<div id="modal-dialog" className="modal-dialog m-0">
					<div id="map-modal-container" className="modal-content w-100">
						<div className="modal-header">
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div id="modalBody" className="modal-body row">
							<div id="map-view-list-container" className="col-4 py-2" style={{ height: document.getElementById("modalBody") ? document.getElementById("modalBody")?.offsetHeight - 32 : "500px" }}>
								<ListView
									listItemType={ListItemType.Property}
									items={items}
									checkIn={checkInParam}
									checkOut={checkOutParam}
									guests={guests}
									nightsCount={nightsCount}
									cols={2}
									isCompact={false}
								/>
							</div>
							<div className="col-8">
								<MapView
									id={"fullscreen-map"}
									height={document.getElementById("modalBody") ? document.getElementById("modalBody")?.offsetHeight - 32 : "500px"}
									center={locationGeo}
									zoom={6}
									points={points}
									isEditable={false}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}