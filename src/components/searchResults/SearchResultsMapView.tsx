import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

import ListView from "/src/components/list/ListView";
import { ListItemType } from "/src/components/list/ListItemType";
import MapView from "/src/components/map/MapView";

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
	const [points, setPoints] = useState([]);
	const [showFullscreenMap, setShowFullscreenMap] = useState(false);
	const olIdToCardIdMap = new Map();

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
		}
	}

	function handleHighlightItem(olId) {
		document.getElementById(olIdToCardIdMap.get(olId)).focus();
	}

	function handleShowMapClick() {
		setShowFullscreenMap(true);
	}
	
	return (
		<div className="container section-container">
			<div className="row">
				<div id="map-view-list-container" className="col-4 py-2" style={{ height: window.innerHeight - 80}}>
					<span className="btn-pill" onClick={() => setIsFullscreenMap(false)}>
						<span className="me-1">Back to list</span>
						<Icon.Map color="white" />
					</span>
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
				<div id="map-container" className="col-8">
					<MapView
						id="fullscreen-map"
						height={window.innerHeight - 80}
						center={locationGeo}
						boundingbox={boundingbox}
						zoom={14}
						points={points}
						isEditable={false}
						updateIdsMap={updateIdsMap}
						handleHighlightItem={handleHighlightItem}
					/>
				</div>
			</div>
		</div>
	);
}