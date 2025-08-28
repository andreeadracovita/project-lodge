import { useEffect, useState } from "react";

import { getPropertiesForHome, getAllPropertyTypes } from "api/BackendApiService";
import ListView from "components/list/ListView";
import { ListItemType } from "components/list/ListItemType";
import CarouselView from "components/list/CarouselView";
import Search from "components/search/Search";
import { trendingDestinations } from "utils/constants";
import { fileStorage, landingImages } from "utils/constants";
import { yearDashMonthDashDay, getNightsCount } from "utils/dateUtils";

function getRandomLandingImage() {
	return landingImages[Math.floor(Math.random() * landingImages.length)];
}

export default function Home() {
	const [backgroundImage, setBackgroundImage] = useState<string>();
	const [properties, setProperties] = useState([]);
	const [propertyTypes, setPropertyTypes] = useState([]);

	// First Saturday
	const checkIn = new Date();
	const currentDayIndex = checkIn.getDay();
	checkIn.setDate(checkIn.getDate() + 6 - currentDayIndex);
	// Sunday, 1 night total
	const checkOut = new Date();
	checkOut.setDate(checkIn.getDate() + 1);

	const checkInParam = yearDashMonthDashDay(checkIn);
	const checkOutParam = yearDashMonthDashDay(checkOut);
	const nightsCount = getNightsCount(checkIn, checkOut);
	const guests = 1;

	useEffect(() => {
		setBackgroundImage(fileStorage + getRandomLandingImage());
		getPropertiesForHome()
			.then(response => {
				setProperties(response.data);
			})
			.catch(error => {
				console.error(error);
			});
		getAllPropertyTypes()
			.then(response => {
				setPropertyTypes(response.data);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	return (
		<>
			<div id="landing-greeting-section" className="d-none d-md-block">
				<div id="landing-greeting-section-container" className="container" style={{ backgroundImage: `url(${backgroundImage})`}}>
					<div id="home-search-bar" className="mb-4">
						<Search />
					</div>
				</div>
			</div>
			<div id="home-search-mobile" className="mt-10 d-block d-md-none">
				<Search />
			</div>

			<div className="container">
				<div id="experience" className="section-container">
					<p className="section-heading">Explore with us</p>
					<div className="d-none d-md-block">
						<CarouselView
							id="properties-carousel"
							listItemType={ListItemType.Property}
							items={properties}
							checkIn={checkInParam}
							checkOut={checkOutParam}
							guests={guests}
							nightsCount={nightsCount}
						/>
					</div>
					<div className="d-block d-md-none">
						<ListView
							listItemType={ListItemType.SmallProperty}
							items={properties.slice(0, 4)}
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

				<div id="trending" className="section-container">
					<p className="section-heading">Trending destinations</p>
					<ListView
						listItemType={ListItemType.Destination}
						items={trendingDestinations}
						checkIn={checkInParam}
						checkOut={checkOutParam}
						guests={guests}
						cols={4}
						nightsCount={nightsCount}
						setNeedsRefresh={undefined}
						isCompact={undefined}
					/>
				</div>

				<div id="type" className="section-container">
					<p className="section-heading">Explore by property type</p>
					<CarouselView
						id="property-type-carousel"
						listItemType={ListItemType.PlaceType}
						items={propertyTypes}
						checkIn={checkInParam}
						checkOut={checkOutParam}
						nightsCount={nightsCount}
						guests={guests}
					/>
				</div>
			</div>
		</>
	);
}
