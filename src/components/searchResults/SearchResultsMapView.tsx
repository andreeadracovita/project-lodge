import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

import "./SearchResultsMapView.css";
import ListView from "/src/components/list/ListView";
import { ListItemType } from "/src/components/list/ListItemType";
import MapView from "/src/components/map/MapView";
import { useAuth } from "/src/components/security/AuthContext";

export default function SearchResultsMapView({
	items,
	checkInParam,
	checkOutParam,
	guests,
	nightsCount,
	locationGeo,
	boundingbox,
	setIsFullscreenMap
}) {
	const authContext = useAuth();
	const [points, setPoints] = useState([]);
	const [showFullscreenMap, setShowFullscreenMap] = useState(false);
	const olIdToCardIdMap = new Map();
	const olIdToPriceMap = new Map();

	useEffect(() => {
		if (!items || items.length === 0) {
			return;
		}
		const pointsArr = [];
		items.map(p => {
			pointsArr.push([p.geo.x, p.geo.y]);
		});
		setPoints(pointsArr);
	}, [items]);

	function updateIdsMap(idArray) {
		for (let i = 0; i < idArray.length; i++) {
			olIdToCardIdMap.set(idArray[i], `small-prop-` + items[i].id);
			olIdToPriceMap.set(idArray[i], items[i].price_total_converted + " " + authContext.currency);
		}
	}

	function handleHighlightItem(olId) {
		document.getElementById(olIdToCardIdMap.get(olId)).focus();
	}

	function handleShowMapClick() {
		setShowFullscreenMap(true);
	}
	
	return (
		<div className="container mt-6">
			<div className="d-flex">
				<div
					id="map-view-left-container"
					style={{ height: window.innerHeight - 90 }}
				>
					<span className="btn-pill" onClick={() => setIsFullscreenMap(false)}>
						<span className="me-1">Show list</span>
						<Icon.List color="white" />
					</span>
					<div id="map-view-list-container" className="mt-6 p-2" style={{ height: window.innerHeight - 90 - 42 }}>
						<ListView
							listItemType={ListItemType.SmallProperty}
							items={items}
							checkIn={checkInParam}
							checkOut={checkOutParam}
							guests={guests}
							nightsCount={nightsCount}
							cols={1}
						/>
					</div>
				</div>
				<div className="ms-2 w-100">
					<MapView
						id="fullscreen-map"
						height={window.innerHeight - 90}
						center={locationGeo}
						boundingbox={boundingbox}
						zoom={14}
						points={points}
						isEditable={false}
						updateIdsMap={updateIdsMap}
						handleHighlightItem={handleHighlightItem}
						shouldShowText={true}
						priceMap={olIdToPriceMap}
					/>
				</div>
			</div>
		</div>
	);
}