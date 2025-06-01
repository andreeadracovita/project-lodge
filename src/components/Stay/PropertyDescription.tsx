import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import AvailabilitySection from "./AvailabilitySection";
import MapView from "/src/components/map/MapView";
import { capitalizeFirstLetter } from "/src/utils/StringUtils";
import { getAllFeatures, getAllExperiences } from "/src/api/LodgeDbApiService";
import { experienceIconMap } from "/src/utils/mappings";

export default function PropertyDescription({property}) {
	const [features, setFeatures] = useState([]);
	const [experiences, setExperiences] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();

	const checkIn = searchParams.get("check_in");
	const checkOut = searchParams.get("check_out");

	useEffect(() => {
		getAllFeatures()
			.then(response => {
				if (response.data) {
					setFeatures(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			});
		getAllExperiences()
			.then(response => {
				if (response.data) {
					setExperiences(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	return (
		<>
			<h2>About this property</h2>
			<p>
				{property.description.replace('\n', <br />)}
			</p>
			<p className="btn btn-outline-dark rounded-pill">Show more</p>
			{/*<p className="btn btn-outline-dark rounded-pill">Show less</p>*/}
			<hr />
			<h2>Features</h2>
			<div>
				{
					property.features_ids.map((id, i) => {
						const foundFeature = features.find(feat => feat.id == id);
						if (foundFeature) {
							return <span key={i} className="features-list-item">{capitalizeFirstLetter(foundFeature.name)}</span>
						}
					})
				}
			</div>
			<hr />
			<h2>Experiences in the area</h2>
			<div>
				{
					property.experiences_ids.map((id, i) => {
						const foundExperience = experiences.find(exp => exp.id == id);
						if (foundExperience) {
							return <span key={i} className="features-list-item">
								{experienceIconMap.get(foundExperience.name)} {capitalizeFirstLetter(foundExperience.name)}
							</span>
						}
					})
				}
			</div>
			<hr />
			<AvailabilitySection />
			<hr />
			<h2>Review section</h2>
			<h2>[Stars here]</h2>
			<h2>[Reviews here]</h2>
			<hr />
			<h2>Area</h2>
			<MapView height={"350px"} center={[property.geo.x, property.geo.y]} zoom={14} points={[[property.geo.x, property.geo.y]]} />
		</>
	);
}
