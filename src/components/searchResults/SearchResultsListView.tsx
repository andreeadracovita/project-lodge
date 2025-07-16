import * as Icon from "react-bootstrap-icons";
import { useSearchParams } from "react-router";

import Filter from "/src/components/filter/Filter";
import ListView from "/src/components/list/ListView";
import { ListItemType } from "/src/components/list/ListItemType";
import MapView from "/src/components/map/MapView";
import Search from "/src/components/search/Search";

export default function SearchResultsListView({
	items,
	checkInParam,
	checkOutParam,
	guests,
	nightsCount,
	lowestPrice,
	highestPrice,
	locationGeo,
	locationString,
	boundingbox,
	propCountString,
	setIsFullscreenMap
}) {
	const [searchParams, setSearchParams] = useSearchParams();
	
	return (
		<div className="container section-container">
			<Search />
			<div className="section-container row">
				<div className="col-3">
					<div className="position-relative">
						<MapView
							id="mini-map"
							height={200}
							center={locationGeo}
							boundingbox={boundingbox}
							zoom={14}
							points={[]}
							isEditable={false}
						/>
						<span
							className="btn-pill position-absolute top-50 start-50 translate-middle"
							onClick={() => setIsFullscreenMap(true)}
						>
							<span className="me-1">Show map</span>
							<Icon.Map color="white" />
						</span>
					</div>
					<div className="section-container">
						<Filter
							city={searchParams.get("city")}
							lowestPrice={lowestPrice}
							highestPrice={highestPrice}
						/>
					</div>
				</div>
				<div className="col-9">
					<h1 className="page-heading">{locationString}: {propCountString} found</h1>
					<div className="mt-10">
						<ListView
							listItemType={ListItemType.Property}
							items={items}
							checkIn={checkInParam}
							checkOut={checkOutParam}
							guests={guests}
							nightsCount={nightsCount}
							cols={3}
							isCompact={false}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}