import { useEffect, useState } from "react";

import { getAllProperties } from "/src/components/api/LodgeDbApiService";
import ListView from "/src/components/ListView";
import Search from "/src/components/search/Search";

import { greetingMessage } from "/src/constants";

export default function Home() {
	const [backgroundImage, setBackgroundImage] = useState();
	const [properties, setProperties] = useState([]);

	useEffect(() => {
		setBackgroundImage('/hero/polar.jpg');

		getAllProperties()
			.then(response => {
				if (response.data.length > 0) {
					setProperties(response.data);
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
				<div id="experience">
					<p className="section-heading">Explore by experience</p>
					<div>
						<span className="features-list-item">🥾 Adventure</span>
						<span className="features-list-item">🏖️ Beach</span>
						<span className="features-list-item">🏛️ Culture</span>
						<span className="features-list-item">🎸 Entertainment</span>
						<span className="features-list-item">🍝 Gastronomy</span>
						<span className="features-list-item">🌲 Nature</span>
						<span className="features-list-item">🍸 Nightlife</span>
						<span className="features-list-item">⚽️ Sports</span>
					</div>
					<div className="mt-4">
						<ListView properties={properties} cols={5} />
					</div>
				</div>

				<div id="trending">
					<p className="section-heading">Trending destinations [Replace with list of destinations]</p>
					<div className="mt-4">
						<ListView properties={properties} cols={5} />
					</div>
				</div>
			</div>
		</>
	);
}
