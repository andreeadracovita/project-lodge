import { useEffect, useState } from "react";

import { getAllProperties, getAllExperiences } from "/src/api/BackendApiService";
import ListView, { ListItemType } from "/src/components/list/ListView";
import Search from "/src/components/search/Search";
import { greetingMessage, trendingDestinations } from "/src/utils/constants";
import { experienceIconMap } from "/src/utils/mappings";
import { capitalizeFirstLetter } from "/src/utils/StringUtils";
import { fileStorage } from "/src/utils/constants";

export default function Home() {
	const [backgroundImage, setBackgroundImage] = useState();
	const [experiences, setExperiences] = useState([]);
	const [properties, setProperties] = useState([]);

	useEffect(() => {
		setBackgroundImage(fileStorage + "polar.jpg");

		getAllProperties()
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
			<div id="landing-greeting-section" style={{ backgroundImage: `url(${backgroundImage})`}}>
				<div id="landing-greeting-section-container" className="container">
					<div className="greeting-message">{ greetingMessage }</div>
					<div id="home-search-bar" className="pb-4">
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
									{ experienceIconMap.get(exp.name) } { capitalizeFirstLetter(exp.name) }
								</span>
							)
						}
					</div>
					<div className="mt-4">
						<ListView listItemType={ListItemType.Property} items={properties} cols={4} />
					</div>
				</div>

				<div id="trending" className="section-container">
					<p className="section-heading">Trending destinations</p>
					<div className="mt-4">
						<ListView listItemType={ListItemType.Destination} items={trendingDestinations} cols={6} />
					</div>
				</div>
			</div>
		</>
	);
}
