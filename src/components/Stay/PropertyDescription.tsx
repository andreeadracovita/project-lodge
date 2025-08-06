import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import AvailabilitySection from "./AvailabilitySection";
import { getAllFeatures, getAllExperiences } from "/src/api/BackendApiService";
import Feature from "/src/components/common/Feature";
import MapView from "/src/components/map/MapView";
import { capitalizeFirstLetter } from "/src/utils/stringUtils";

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

	const guestsString = property.guests + " " + (property.guests > 1 ? "guests" : "guest");
	const bedsString = property.beds + " " + (property.beds > 1 ? "beds" : "bed");
	const bedroomsString = property.bedrooms + " " + (property.bedrooms > 1 ? "bedrooms" : "bedroom");
	const bathroomsString = property.bathrooms + " " + (property.bathrooms > 1 ? "bathrooms" : "bathroom");

	return (
		<>
			<h2 className="section-heading">About this property</h2>
			<div className="mt-10">
				{property.description.replace('\n', <br />)}
			</div>
			<div className="mt-6">Max {guestsString}</div>
			<div className="mt-6">{bedsString}, {bedroomsString}, {bathroomsString}</div>
			{/*<div className="btn-pill-outline mt-6">Show more</div>
			<div className="btn-pill-outline mt-6">Show less</div>*/}
			<hr />
			<h2 className="section-heading">Features</h2>
			<div className="mt-10">
				{
					property.features_ids.map((id, i) => {
						const foundFeature = features.find(feat => feat.id == id);
						if (foundFeature) {
							return <span key={i} className="mt-10"><Feature name={foundFeature.name} isLarge={true} /></span>
						}
					})
				}
			</div>
			{/*<div className="btn-pill-outline mt-6">Show more</div>
			<div className="btn-pill-outline mt-6">Show less</div>*/}
			{
				property.is_listed &&
				<>
					<hr />
					<AvailabilitySection />
				</>
			}
			<hr />
			<h2 className="section-heading">Experiences around</h2>
			<div className="mt-10">
				{
					property.experiences_ids.map((id, i) => {
						const foundExperience = experiences.find(exp => exp.id == id);
						if (foundExperience) {
							return <span key={i} className="features-list-item">
								{capitalizeFirstLetter(foundExperience.name)}
							</span>
						}
					})
				}
			</div>
			<hr />
			<h2 className="section-heading">Area</h2>
			<div className="mt-10">
				<MapView
					id="map"
					height={350}
					center={[property.geo.x, property.geo.y]}
					zoom={14}
					points={[[property.geo.x, property.geo.y]]}
				/>
			</div>
		</>
	);
}
