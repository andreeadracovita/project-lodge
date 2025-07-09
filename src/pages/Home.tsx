import { useEffect, useState } from "react";

import { getPropertiesForHome, getAllExperiences } from "/src/api/BackendApiService";
import ListView from "/src/components/list/ListView";
import { ListItemType } from "/src/components/list/ListItemType";
import CarouselView from "/src/components/list/CarouselView";
import Search from "/src/components/search/Search";
import { greetingMessage, trendingDestinations, placeTypes } from "/src/utils/constants";
import { experienceIconMap } from "/src/utils/mappings";
import { capitalizeFirstLetter } from "/src/utils/StringUtils";
import { fileStorage, landingImages } from "/src/utils/constants";
import { yearDashMonthDashDay } from "/src/utils/DateFormatUtils";

function getRandomLandingImage() {
	return landingImages[Math.floor(Math.random() * landingImages.length)];
}

export default function Home() {
	const [backgroundImage, setBackgroundImage] = useState();
	const [experiences, setExperiences] = useState([]);
	const [properties, setProperties] = useState([]);

	// First Saturday
	const checkIn = new Date();
	const currentDayIndex = checkIn.getDay();
	checkIn.setDate(checkIn.getDate() + 6 - currentDayIndex);
	// Sunday, 1 night total
	const checkOut = new Date();
	checkOut.setDate(checkIn.getDate() + 1);

	const checkInParam = yearDashMonthDashDay(checkIn);
	const checkOutParam = yearDashMonthDashDay(checkOut);
	const guests = 1;

	useEffect(() => {
		setBackgroundImage(fileStorage + getRandomLandingImage());
		getPropertiesForHome()
			.then(response => {
				if (response.data.length > 0) {
					setProperties(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			});

		getAllExperiences()
			.then(response => {
				if (response.data.length > 0) {
					setExperiences(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	return (
		<>
			<div id="landing-greeting-section">
				<div id="landing-greeting-section-container" className="container" style={{ backgroundImage: `url(${backgroundImage})`}}>
					<div id="home-search-bar" className="mb-4">
						<Search />
					</div>
				</div>
			</div>

			<div className="container">
				<div id="experience" className="section-container">
					<p className="section-heading">Explore by experience</p>
					<div>
						{
							experiences.map((exp, i) => 
								<span key={i} className="features-list-item">
									{/*{ experienceIconMap.get(exp.name) }*/}
									{ capitalizeFirstLetter(exp.name) }
								</span>
							)
						}
					</div>
					<div className="mt-4">
						<CarouselView
							id="properties-carousel"
							listItemType={ListItemType.Property}
							items={properties}
							checkIn={checkInParam}
							checkOut={checkOutParam}
							guests={guests}
						/>
					</div>
				</div>

				<div id="trending" className="section-container">
					<p className="section-heading">Trending destinations</p>
					<div className="mt-4">
						<ListView
							listItemType={ListItemType.Destination}
							items={trendingDestinations}
							checkIn={checkIn}
							checkOut={checkOut}
							guests={guests}
							cols={4}
						/>
					</div>
				</div>

				<div id="type" className="section-container">
					<p className="section-heading">Explore by property type</p>
					<div className="mt-4">
						<CarouselView
							id="property-type-carousel"
							listItemType={ListItemType.PlaceType}
							items={placeTypes}
							checkIn={checkInParam}
							checkOut={checkOutParam}
							guests={guests}
							cols={4}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
