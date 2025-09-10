import { Filter as FilterIcon, Map } from "react-bootstrap-icons";
import { useSearchParams } from "react-router";
import countries from "react-select-country-list";

import Filter from "components/filter/Filter";
import ListView from "components/list/ListView";
import { ListItemType } from "components/list/ListItemType";
import MapView from "components/map/MapView";
import Search from "components/search/Search";

type SearchResultsListViewProps = {
	items: any[],
	nightsCount?: number,
	priceRange: number[],
	geo: any,
	setIsFullscreenMap: any
};

export default function SearchResultsListView({
	items,
	nightsCount,
	priceRange,
	geo,
	setIsFullscreenMap
}: SearchResultsListViewProps) {
	const [searchParams] = useSearchParams();

	const countString = `${items.length} ${items.length > 1 ? "results" : "result"}`;
	const checkInParam = searchParams.get("check_in") || undefined;
	const checkOutParam = searchParams.get("check_out") || undefined;
	const guests = parseInt(searchParams.get("guests") || "1");
	const city = searchParams.get("city") || undefined;

	function getLocationString() {
		let locationString = "";
		if (searchParams.get("country")) {
			locationString = countries().getLabel(searchParams.get("country") || "");
		}

		const city = searchParams.get("city");
		if (city) {
			locationString = city + ", " + locationString;
		}
		return locationString;
	}
	
	return (
		<div className="container section-container">
			<Search />
			<div className="d-none d-md-block">
				{/*Desktop*/}
				<div className="section-container d-flex">
					<div className="search-page-fixed-width-left">
						<div className="position-relative">
							<MapView
								id="mini-map-desktop"
								height={200}
								center={geo.coordinate}
								boundingbox={geo.boundingbox}
								zoom={14}
								points={[]}
								isEditable={false}
								updatePinPosition={undefined}
								updateIdsMap={undefined}
								handleHighlightItem={undefined}
								shouldShowText={undefined}
								priceMap={undefined}
							/>
							<span
								className="btn-pill position-absolute top-50 start-50 translate-middle"
								onClick={() => setIsFullscreenMap(true)}
							>
								<span className="me-1">Show map</span>
								<Map color="white" />
							</span>
						</div>
						<div className="section-container">
							<Filter
								city={city}
								lowestPrice={priceRange[0]}
								highestPrice={priceRange[1]}
							/>
						</div>
					</div>
					<div className="ms-2">
						<h1 className="page-heading">{getLocationString()}: {countString} found</h1>
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
								setNeedsRefresh={undefined}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="d-block d-md-none">
				{/*Mobile*/}
				<div className="position-relative">
					<MapView
						id="mini-map-mobile"
						height={150}
						center={geo.coordinate}
						boundingbox={geo.boundingbox}
						zoom={14}
						points={[]}
						isEditable={false}
						updatePinPosition={undefined}
						updateIdsMap={undefined}
						handleHighlightItem={undefined}
						shouldShowText={undefined}
						priceMap={undefined}
					/>
					<span
						className="btn-pill position-absolute top-50 start-50 translate-middle"
						onClick={() => setIsFullscreenMap(true)}
					>
						<span className="me-1">Show map</span>
						<Map color="white" />
					</span>
				</div>
				<div className="m-2">
					<h1 className="page-heading">{getLocationString()}: {countString} found</h1>
					<div className="dropdown mt-2">
						<div id="dropdown-button" role="button" data-bs-toggle="dropdown" data-bs-auto-close="false">
							<span className="btn-pill-outline">Filters <FilterIcon size={24} /></span>
						</div>
						<div className="dropdown-menu dropdown-menu-start">
							<Filter
								city={city}
								lowestPrice={priceRange[0]}
								highestPrice={priceRange[1]}
							/>
						</div>
					</div>
					<div className="mt-10">
						<ListView
							listItemType={ListItemType.SmallProperty}
							items={items}
							checkIn={checkInParam}
							checkOut={checkOutParam}
							guests={guests}
							nightsCount={nightsCount}
							cols={1}
							isCompact={false}
							setNeedsRefresh={undefined}
						/>
					</div>
				</div>
			</div>
			
		</div>
	)
}