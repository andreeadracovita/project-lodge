import { useEffect, useState } from "react";
import { List } from "react-bootstrap-icons";
import { useSearchParams } from "react-router";

import "./SearchResultsMapView.css";
import ListView from "components/list/ListView";
import { ListItemType } from "components/list/ListItemType";
import MapView from "components/map/MapView";
import { useAuth } from "components/security/AuthContext";

type SearchResultsMapViewProps = {
	items: any,
	nightsCount: number | undefined,
	geo: any,
	setIsFullscreenMap: any
};

export default function SearchResultsMapView({
	items,
	nightsCount,
	geo,
	setIsFullscreenMap
}: SearchResultsMapViewProps) {
	const authContext: any = useAuth();
	const [searchParams] = useSearchParams();

	const [points, setPoints] = useState<any[]>([]);
	const olIdToCardIdMap = new Map();
	const olIdToPriceMap = new Map();
	const checkInParam = searchParams.get("check_in") || undefined;
	const checkOutParam = searchParams.get("check_out") || undefined;
	const guests = parseInt(searchParams.get("guests") || "1");

	useEffect(() => {
		if (!items || items.length === 0) {
			return;
		}
		const pointsArr: any[] = [];
		items.map((p: any) => {
			pointsArr.push([p.geo.x, p.geo.y]);
		});
		setPoints(pointsArr);
	}, [items]);

	function updateIdsMap(idArray: number[]): void {
		for (let i = 0; i < idArray.length; i++) {
			olIdToCardIdMap.set(idArray[i], `small-prop-` + items[i].id);
			olIdToPriceMap.set(idArray[i], items[i].price_total_converted + " " + authContext.currency);
		}
	}

	function handleHighlightItem(olId: number): void {
		document.getElementById(olIdToCardIdMap.get(olId))?.focus();
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
						<List color="white" />
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
							setNeedsRefresh={undefined}
							isCompact={undefined}
						/>
					</div>
				</div>
				<div className="ms-2 w-100">
					<MapView
						id="fullscreen-map"
						height={window.innerHeight - 90}
						center={geo.coordinate}
						boundingbox={geo.boundingbox}
						zoom={14}
						points={points}
						isEditable={false}
						updateIdsMap={updateIdsMap}
						handleHighlightItem={handleHighlightItem}
						shouldShowText={true}
						priceMap={olIdToPriceMap}
						updatePinPosition={undefined}
					/>
				</div>
			</div>
		</div>
	);
}